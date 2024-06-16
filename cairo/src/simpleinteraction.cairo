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
mod Altruist {
    // importing IMintableDispacher and the trait into the module scope
    use super::IMintableDispatcher;
    use super::IMintableDispatcherTrait;
    use starknet::contract_address_const;
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::get_contract_address;


    #[storage]
    struct Storage {
        contract: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, contract: ContractAddress) {
        self.contract.write(contract);
    }

    #[external(v0)]
    fn mint(self: @ContractState, amount: u256) {
        // address of the contract we want to call
        let token_addr: ContractAddress = contract_address_const::<
            0x12325ba8fb37c73cab1853c5808b9ee69193147413d21594a61581da64ff29d
        >();

        // create a dispatcher using the token address
        let token = IMintableDispatcher { contract_address: token_addr };
        let addr: ContractAddress = get_caller_address();

        // call a function from the IMintable interface
        token.mint(addr, amount);
    }
    #[external(v0)]
    fn stake(self: @ContractState, amount: u256) {
        let incomeTk: ContractAddress = contract_address_const::<
            0x12325ba8fb37c73cab1853c5808b9ee69193147413d21594a61581da64ff29d
        >();
        let ptAddr: ContractAddress = contract_address_const::<
            0x4a0698b2962ced0254cb2159bdc3057a3b02da61366aeb32e19fa46961a97a7
        >();
        let ytAddr: ContractAddress = contract_address_const::<
            0x3385fb8e251835ba5b7178e2fb4acf551e5e63d8faea3a3bda4f26e4ac3222c
        >();

        let incTk = IMintableDispatcher { contract_address: incomeTk };
        let ptTk = IMintableDispatcher { contract_address: ptAddr };
        let ytTk = IMintableDispatcher { contract_address: ytAddr };

        let addr: ContractAddress = get_caller_address();

        incTk.transfer_from(addr, get_contract_address(), amount);
        ptTk.mint(addr, amount);
        ytTk.mint(addr, amount);
    }
}
