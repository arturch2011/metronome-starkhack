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

    fn _mint(ref self: ContractState, to: ContractAddress, amount: u256) {
        self.balanceOf.write(to, self.balanceOf.read(to) + amount);
        self.totalSupply += amount;
    }

    fn _burn(ref self: ContractState, from: ContractAddress, amount: u256) {
        self.balanceOf.write(from, self.balanceOf.read(from) - amount);
        self.totalSupply -= amount;
    }

    fn _updade(ref self: ContractState, reserve0: u256, reserve1: u256) {
        self.reserve0.write(self.reserve0.read() - reserve0);
        self.reserve1.write(self.reserve1.read() - reserve1);
    }

    #[external(v0)]
    fn swap(tokenIn: ContractAddress, amountIn: u256) -> u256 {
        assert(
            tokenIn == self.token1.read() || tokenIn == self.token2.read(), "Invalid token address"
        );
        assert(amountIn > 0, "Invalid amount");

        // Pull in token in
        let incTk = IMintableDispacher { contract_address: tokenIn };
        incTk.transfer_from(get_caller_address(), get_contract_address(), amountIn);

        if tokenIn == self.token0.read() { // Transfer token1 to caller    
            transfer_from(self.token0.read(), get_caller_address(), amountIn);
        } else { // Transfer token2 to caller
            transfer_from(self.token1.read(), get_caller_address(), amountIn);
        }

        // Calculate token out (inlcuding fees) fee 0.3%
        let amountInWithFee = (amountIn * 997) / 1000;
    //let amountOut:u256 = 

    // Transfer token out to msg.sender
    // Update the reserves
    }

    fn add_liquidity(ref self: ContractState, token_address: ContractAddress, token_amount: u256) {
        assert(token_amount > 0, 'deposit amount has to be > 0');
        let pool_balance = self.get_pool_balance(token_address);

        let caller: ContractAddress = get_caller_address();
        let balance = IERC20Dispatcher { contract_address: token_address }.balance_of(caller);
        assert(balance >= token_amount.into(), 'balance should be >= deposit');

        let account_balance = self.get_account_balance(caller, token_address);
        self.pool_balance.write(token_address, pool_balance + token_amount);
    }

    fn remove_liquidity(
        ref self: ContractState, token_address: ContractAddress, token_amount: u256
    ) {
        let caller: ContractAddress = get_caller_address();
    }
}
