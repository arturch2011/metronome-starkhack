#[starknet::interface]
trait IMintable<TContractState> {
    fn mint(ref self: TContractState, receiver: starknet::ContractAddress, amount: u256);
    fn transfer(ref self: TContractState, receiver: starknet::ContractAddress, amount: u256);
    fn approve(ref self: TContractState, spender: starknet::ContractAddress, amount: u256);
    fn transfer_from(
        ref self: TContractState,
        sender: starknet::ContractAddress,
        receiver: starknet::ContractAddress,
        amount: u256,
    );
    fn balance_of(ref self: TContractState, account: starknet::ContractAddress) -> u256;
}

#[starknet::contract]
mod Amm {
    use super::IMintableDispatcher;
    use super::IMintableDispatcherTrait;

    use starknet::contract_address_const;
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::get_contract_address;

    #[storage]
    struct Storage {
        token0: ContractAddress,
        token1: ContractAddress,
        reserve0: u256,
        reserve1: u256,
        totalSupply: u256,
        balanceOf: LegacyMap<ContractAddress, u256>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, token1: ContractAddress, token2: ContractAddress) {
        self.token0.write(token1);
        self.token1.write(token2);
    }

    #[generate_trait]
    pub impl InternalImpl of InternalTrait {
        fn _mint(ref self: ContractState, to: ContractAddress, amount: u256) {
            self.balanceOf.write(to, self.balanceOf.read(to) + amount);
            self.totalSupply.write(self.totalSupply.read() + amount);
        }

        fn _burn(ref self: ContractState, from: ContractAddress, amount: u256) {
            self.balanceOf.write(from, self.balanceOf.read(from) - amount);
            self.totalSupply.write(self.totalSupply.read() - amount);
        }

        fn _min(self: @ContractState, x: u256, y: u256) -> u256 {
            if x <= y {
                x
            } else {
                y
            }
        }


        fn _update(ref self: ContractState, reserve0: u256, reserve1: u256) -> () {
            self.reserve0.write(reserve0);
            self.reserve1.write(reserve1);
        }

        fn _sqrt(ref self: ContractState, y: u256) -> u256 {
            let mut z: u256 = y;

            if (y > 3) {
                let mut x: u256 = y / 2 + 1;
                while (x < z) {
                    z = x;
                    x = (y / x + x) / 2;
                }
            } else if (y != 0) {
                z = 1;
            }
            z
        }
    }


    #[external(v0)]
    fn swap(ref self: ContractState, tokenIn: ContractAddress, amountIn: u256) -> u256 {
        assert(
            tokenIn == self.token0.read() || tokenIn == self.token1.read(), 'Invalid token address'
        );
        assert(amountIn > 0, 'Invalid amount');

        // Pull in token in
        let incTk = IMintableDispatcher { contract_address: tokenIn };
        incTk.transfer_from(get_caller_address(), get_contract_address(), amountIn);

        if tokenIn == self.token0.read() { // Transfer token1 to caller    
            let reserveOut = self.reserve1.read();
            let reserveIn = self.reserve0.read();

            // Calculate token out (inlcuding fees) fee 0.3%
            let amountInWithFee = (amountIn * 997) / 1000;
            let amountOut = (reserveOut * amountInWithFee) / (reserveIn + amountInWithFee);

            // Transfer token out to msg.sender
            let outTk = IMintableDispatcher { contract_address: self.token1.read() };
            outTk.transfer(get_caller_address(), amountOut);

            // Update the reserves
            self
                ._update(
                    incTk.balance_of(get_contract_address()),
                    outTk.balance_of(get_contract_address()),
                );
            // Return amountOut
            amountOut
        } else { // Transfer toke   n2 to caller
            let reserveOut = self.reserve0.read();
            let reserveIn = self.reserve1.read();

            // Calculate token out (inlcuding fees) fee 0.3%
            let amountInWithFee = (amountIn * 997) / 1000;
            let amountOut = (reserveOut * amountInWithFee) / (reserveIn + amountInWithFee);

            // Transfer token out to msg.sender
            let outTk = IMintableDispatcher { contract_address: self.token0.read() };
            outTk.transfer(get_caller_address(), amountOut);

            // Update the reserves
            self
                ._update(
                    outTk.balance_of(get_contract_address()),
                    incTk.balance_of(get_contract_address()),
                );
            // Return amountOut
            amountOut
        }
    }
    #[external(v0)]
    fn add_liquidity(ref self: ContractState, amount0: u256, amount1: u256) -> u256 {
        let token0 = IMintableDispatcher { contract_address: self.token0.read() };
        let token1 = IMintableDispatcher { contract_address: self.token1.read() };
        let mut shares: u256 = 0;

        // pull in token0 and token1
        token0.transfer_from(get_caller_address(), get_contract_address(), amount0);
        token1.transfer_from(get_caller_address(), get_contract_address(), amount1);

        if (self.reserve0.read() > 0 || self.reserve1.read() > 0) {
            assert(
                (self.reserve0.read() * amount1) == (self.reserve1.read() * amount0),
                'dy / dx != y / x'
            );
        }

        // mint shares
        // f(x, y) = value of liquidity = sqrt(xy)
        // s = dx / x * T = dy / y * T
        if (self.totalSupply.read() == 0) {
            let val: u256 = amount0 * amount1;
            let shar: u256 = self._sqrt(val);
            shares = shar;
        } else {
            shares = self
                ._min(
                    (amount0 * self.totalSupply.read()) / self.reserve0.read(),
                    (amount1 * self.totalSupply.read()) / self.reserve1.read(),
                );
        }
        assert(shares > 0, 'sheres = 0');
        self._mint(get_caller_address(), shares);

        // update reserves
        let token0 = IMintableDispatcher { contract_address: self.token0.read() };
        let token1 = IMintableDispatcher { contract_address: self.token1.read() };
        self
            ._update(
                token0.balance_of(get_contract_address()), token1.balance_of(get_contract_address())
            );
        return shares;
    }
    #[external(v0)]
    fn remove_liquidity(ref self: ContractState, shares: u256) -> (u256, u256) {
        // calculate amount0 and amount1 to withdraw
        // dx = s / T * x
        // dy = s / T * y
        let token0 = IMintableDispatcher { contract_address: self.token0.read() };
        let token1 = IMintableDispatcher { contract_address: self.token1.read() };

        let bal0 = token0.balance_of(get_contract_address());
        let bal1 = token1.balance_of(get_contract_address());

        let amount0 = (shares * bal0) / self.totalSupply.read();
        let amount1 = (shares * bal1) / self.totalSupply.read();
        assert(amount0 > 0 && amount1 > 0, 'amount0 or amount1 = 0');

        // burn shares
        self._burn(get_caller_address(), shares);

        // update reserves
        self._update(bal0 - amount0, bal1 - amount1);

        // transfer tokens to msg.sender
        token0.transfer(get_caller_address(), amount0);
        token1.transfer(get_caller_address(), amount1);

        return (amount0, amount1);
    }
}
