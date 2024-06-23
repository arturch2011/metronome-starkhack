#[starknet::interface]
trait IMintable<TContractState> {
    fn mint(ref self: TContractState, receiver: starknet::ContractAddress, amount: u256);
    fn transfer(ref self: TContractState, receiver: starknet::ContractAddress, amount: u256);
    fn approve(ref self: TContractState, spender: starknet::ContractAddress, amount: u256);
    fn balance_of(self: @TContractState, account: starknet::ContractAddress) -> u256;
    fn transfer_from(
        ref self: TContractState,
        sender: starknet::ContractAddress,
        receiver: starknet::ContractAddress,
        amount: u256,
    );
}

#[starknet::contract]
mod Amm {
    use core::traits::Into;
    use super::IMintableDispatcher;
    use super::IMintableDispatcherTrait;

    use starknet::contract_address_const;
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::get_contract_address;

    //sy + eth

    #[storage]
    struct Storage {
        syToken: ContractAddress,
        ethToken: ContractAddress,
        syReserve: u256,
        ethReserve: u256,
        totalSupply: u256,
        balanceOf: LegacyMap<ContractAddress, u256>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, syToken: ContractAddress, ethToken: ContractAddress) {
        self.syToken.write(syToken);
        self.ethToken.write(ethToken);
    }

    fn _mint(ref self: ContractState, to: ContractAddress, amount: u256) {
        self.balanceOf.write(to, self.balanceOf.read(to) + amount);
        self.totalSupply.write(self.totalSupply.read() + amount);
    }

    fn _burn(ref self: ContractState, from: ContractAddress, amount: u256) {
        self.balanceOf.write(from, self.balanceOf.read(from) - amount);
        self.totalSupply.write(self.totalSupply.read() - amount);
    }

    //fn _updade(ref self: ContractState, syReserveNew: u256, ethReserveNew: u256) {
    //    self.syReserve.write(syReserveNew);
    //    self.ethReserve.write(ethReserveNew);
    //}

    #[external(v0)]
    fn swap(ref self: ContractState, tokenIn: ContractAddress, amountIn: u256) -> u256 {
        assert(
            tokenIn == self.ethToken.read() || tokenIn == self.syToken.read(),
            'Invalid token address'
        );
        assert(amountIn > 0, 'Invalid amount');

        // Pull in token in
        IMintableDispatcher { contract_address: tokenIn }
            .transfer_from(get_caller_address(), get_contract_address(), amountIn.into());

        if tokenIn == self.syToken.read() { // Transfer yt to caller
            IMintableDispatcher { contract_address: self.syToken.read() }
                .transfer_from(get_caller_address(), get_contract_address(), amountIn.into());
            // Update the reserves
            self.syReserve.write(self.syReserve.read() - amountIn);
            self.ethReserve.write(self.ethReserve.read() + amountIn);
        } else { // Transfer eth to caller
            IMintableDispatcher { contract_address: self.ethToken.read() }
                .transfer_from(get_caller_address(), get_contract_address(), amountIn.into());
            // Update the reserves
            self.syReserve.write(self.syReserve.read() + amountIn);
            self.ethReserve.write(self.ethReserve.read() - amountIn);
        }
        // Calculate token out (including fees) fee 0.3%
        // let amountInWithFee = (amountIn * 997) / 1000;
        // let amountOut:u256 = 

        // Transfer token out to msg.sender
        1
    }

    fn add_liquidity(
        ref self: ContractState,
        syToken_address: ContractAddress,
        syToken_amount: u256,
        ethToken_address: ContractAddress,
        ethToken_amount: u256
    ) {
        assert(syToken_amount > 0 && ethToken_amount > 0, 'deposit amount has to be > 0');
        let caller: ContractAddress = get_caller_address();

        let balance = IMintableDispatcher { contract_address: syToken_address }.balance_of(caller);
        assert(balance >= syToken_amount.into(), 'balance should be >= deposit');

        let balance = IMintableDispatcher { contract_address: ethToken_address }.balance_of(caller);
        assert(balance >= ethToken_amount.into(), 'balance should be >= deposit');

        IMintableDispatcher { contract_address: syToken_address }
            .transfer_from(caller, syToken_address, syToken_amount);
        IMintableDispatcher { contract_address: ethToken_address }
            .transfer_from(caller, ethToken_address, ethToken_amount);

        self.syReserve.write(self.syReserve.read() + syToken_amount);
        self.ethReserve.write(self.ethReserve.read() + ethToken_amount);

        //considerando que os tokens tem valores sempre igual a 1. Seria um token LP
        //_mint(ref self: ContractState, caller, (syToken_amount + ethToken_amount));
        self
            .balanceOf
            .write(caller, self.balanceOf.read(caller) + (syToken_amount + ethToken_amount));
        self.totalSupply.write(self.totalSupply.read() + (syToken_amount + ethToken_amount));
    }

    fn remove_liquidity(ref self: ContractState, token_amount: u256) {
        assert(token_amount > 0, 'token amount has to be > 0');
        let caller: ContractAddress = get_caller_address();

        let callerToken = self.balanceOf.read(caller);
        assert(callerToken >= token_amount, 'balance should be >= amount');

        IMintableDispatcher { contract_address: self.syToken.read() }
            .transfer_from(self.syToken.read(), caller, (token_amount / 2));

        IMintableDispatcher { contract_address: self.ethToken.read() }
            .transfer_from(self.ethToken.read(), caller, (token_amount / 2));

        self.syReserve.write(self.syReserve.read() - (token_amount / 2));
        self.ethReserve.write(self.ethReserve.read() - (token_amount / 2));
        self.balanceOf.write(caller, self.balanceOf.read(caller) - token_amount);
        self.totalSupply.write(self.totalSupply.read() - token_amount);
    }
}
