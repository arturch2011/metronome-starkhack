import { Account, CallData, Contract, RpcProvider, stark } from "starknet";
import * as dotenv from "dotenv";
import { getCompiledCode } from "./utils";
dotenv.config();

const RPC_ENDPOINT = "https://starknet-sepolia.public.blastapi.io/rpc/v0_7";

async function main() {
    const provider = new RpcProvider({
        nodeUrl: RPC_ENDPOINT,
    });

  //   // initialize existing predeployed account 0
    console.log("ACCOUNT_ADDRESS=", process.env.DEPLOYER_ADDRESS);
    console.log("ACCOUNT_PRIVATE_KEY=", process.env.DEPLOYER_PRIVATE_KEY);
    const privateKey0 = process.env.DEPLOYER_PRIVATE_KEY ?? "";
    const deployer_address: string = process.env.DEPLOYER_ADDRESS ?? "";
    const account0 = new Account(provider, deployer_address, privateKey0, "1");
    console.log("Account connected.\n");

  // Declare & deploy contract
    let sierraCode, casmCode;

    try {
        ({ sierraCode, casmCode } = await getCompiledCode(
            "cairo_YieldToken"
        ));
    } catch (error: any) {
        console.log("Failed to read contract files");
        process.exit(1);
    }

    const myCallData = new CallData(sierraCode.abi);
    const constructor = myCallData.compile("constructor", {
        owner: deployer_address,
    });
    try {
        const deployResponse = await account0.declareAndDeploy({
            contract: sierraCode,
            casm: casmCode,
            salt: stark.randomAddress(),
            constructorCalldata: constructor,
        });
        console.log(
            `✅ Contract has been deploy with the address: ${deployResponse.deploy.address}`
        );
        console.log(`✅ Contract has been deploy data ${deployResponse.deploy.calldata}`);
    } catch (error: any) {
        console.log("ERRO NO DEPLOYYYY");
        console.log(error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
