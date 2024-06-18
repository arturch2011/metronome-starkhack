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

    #[external(v0)]
    fn swap(tokenIn: ContractAddress, amountIn: u256) -> u256 {
        assert(
            tokenIn == self.token1.read() || tokenIn == self.token2.read(), "Invalid token address"
        );
        assert(amountIn > 0, "Invalid amount");

        // Pull in token in
        let incTk = IMintableDispacher { contract_address: tokenIn };
        incTk.transfer_from(get_caller_address(), get_contract_address(), amountIn);

        if tokenIn == self.token0.read() {// Transfer token1 to caller    

        } else {// Transfer token2 to caller

        }
    // Calculate token out (inlcuding fees) fee 0.3%
    // Transfer token out to msg.sender
    // Update the reserves
    }

    fn add_liquidity() {}

    fn remove_liquidity() {}
}
