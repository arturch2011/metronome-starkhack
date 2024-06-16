use starknet::ContractAddress;

#[starknet::interface]
trait IDepCont<TContractState> {
    fn deposit(self: @TContractState, amount: u128);
    fn withdraw(self: @TContractState, amount: u128);
}

#[starknet::contract]
mod DepCont {
    use starknet::ContractAddress;
    use starknet::get_caller_address;

    #[storage]
    struct Storage {
        contract_owner: ContractAddress,
        balances: LegacyMap<ContractAddress, u128>
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.contract_owner.write(owner);
    }

    #[abi(embed_v0)]
    impl DepContImpl of super::IDepCont<ContractState> {
        fn deposit(self: @ContractState, amount: u128) {
            let caller: ContractAddress = get_caller_address();
            let caller_bal: u128 = self.balances.read(caller);
            let final_bal: u128 = caller_bal + amount;
            self.balances.write(caller, final_bal);
        }

        fn withdraw(self: @ContractState, amount: u128) {
            let caller: ContractAddress = get_caller_address();
            let caller_bal: u128 = self.balances.read(caller);
            assert(caller_bal < amount, 'Insufficient balance');
            let final_bal: u128 = caller_bal - amount;
            self.balances.write(caller, final_bal);
        //Transfer func

        }
    }
}
