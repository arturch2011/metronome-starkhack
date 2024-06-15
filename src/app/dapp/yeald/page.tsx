"use client";

import Link from "next/link";
import {
    useBlockNumber,
    useAccount,
    useBalance,
    useContractRead,
    useContract,
    useContractWrite,
    useExplorer,
    useWaitForTransaction,
} from "@starknet-react/core";
import contractAbi from "../../../abis/abi.json";
import myTokenAbi from "../../../abis/mTAbi.json";

import { useState, useMemo, use } from "react";

export default function Yeald() {
    const { address: userAddress } = useAccount();
    const [amount, setAmount] = useState(0);
    const {
        isLoading: balanceIsLoading,
        isError: balanceIsError,
        error: balanceError,
        data: balanceData,
    } = useBalance({
        token: "0x12325ba8fb37c73cab1853c5808b9ee69193147413d21594a61581da64ff29d",
        address: userAddress,
        watch: true,
    });

    const {
        isLoading: balancePTIsLoading,
        isError: balancePTIsError,
        error: balancePTError,
        data: balancePTData,
    } = useBalance({
        token: "0x4a0698b2962ced0254cb2159bdc3057a3b02da61366aeb32e19fa46961a97a7",
        address: userAddress,
        watch: true,
    });
    const {
        isLoading: balanceYTIsLoading,
        isError: balanceYTIsError,
        error: balanceYTError,
        data: balanceYTData,
    } = useBalance({
        token: "0x3385fb8e251835ba5b7178e2fb4acf551e5e63d8faea3a3bda4f26e4ac3222c",
        address: userAddress,
        watch: true,
    });

    let ptbal = "0";
    let ytbal = "0";
    let strkbal = "0";
    const contractAddress =
        "0x741a663dfed73e9c2850850a9b4fe4ea7829d4c92182c3858c75d648a0a024b";

    const myTokenAddr =
        "0x12325ba8fb37c73cab1853c5808b9ee69193147413d21594a61581da64ff29d";

    if (!balanceIsLoading && !balanceIsError) {
        strkbal = balanceData?.formatted!;
    }

    if (!balancePTIsLoading && !balancePTIsError) {
        ptbal = balancePTData?.formatted!;
    }

    if (!balanceYTIsLoading && !balanceYTIsError) {
        ytbal = balanceYTData?.formatted!;
    }
    const { contract } = useContract({
        abi: contractAbi,
        address: contractAddress,
    });
    const contractaprov = useContract({
        abi: myTokenAbi,
        address: myTokenAddr,
    });

    const handleSubmit = async () => {
        // TO DO: Implement Starknet logic here
        writeAsync();
    };

    const calls = useMemo(() => {
        if (!userAddress || !contract) return [];
        console.log(userAddress);

        // return contract.populateTransaction["approve"]!(contractAddress,{ low: (amount ? amount : 0), high: 0 });
        return contract.populateTransaction["stake"]!({
            low: amount ? amount : 0,
            high: 0,
        });
    }, [contract, userAddress, amount]);

    const {
        writeAsync,
        data: writeData,
        isPending: writeIsPending,
    } = useContractWrite({
        calls,
    });

    const {
        isLoading: waitIsLoading,
        isError: waitIsError,
        error: waitError,
        data: waitData,
    } = useWaitForTransaction({
        hash: writeData?.transaction_hash,
        watch: true,
    });
    const LoadingState = ({ message }: { message: string }) => (
        <div className="flex items-center space-x-2">
            <div className="animate-spin">
                <svg
                    className="h-5 w-5 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </div>
            <span>{message}</span>
        </div>
    );

    const buttonContent = () => {
        if (writeIsPending) {
            return <LoadingState message="Send..." />;
        }

        if (waitIsLoading) {
            return <LoadingState message="Waiting for confirmation..." />;
        }

        if (waitData && waitData.status === "REJECTED") {
            return <LoadingState message="Transaction rejected..." />;
        }

        if (waitData) {
            return "Transaction confirmed";
        }

        return "Send";
    };

    return (
        <div className="min-h-screen w-full">
            <section className=" py-28 px-10 w-full flex items-center justify-center">
                <div className="flex flex-col w-full max-w-xl gap-8">
                    <div className="inline-flex items-center justify-start ">
                        <Link
                            href={"/"}
                            className="flex rounded-xl  px-2 py-1  border-solid border-2 border-primary text-primary hover:bg-primary hover:text-baser ease-in-out duration-500 active:bg-baser active:text-primary active:duration-0 text-lg font-bold"
                        >
                            &lt;
                        </Link>
                    </div>
                    <h1 className="font-bold text-3xl">Proof of Concept</h1>
                    <div className="w-full p-3 backdrop-blur-sm  rounded-xl flex items-start gap-8 sombra border-2 border-primary">
                        <svg
                            fill="#ec796b"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30px"
                            height="30px"
                            viewBox="0 0 416.979 416.979"
                        >
                            <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path>{" "}
                        </svg>
                        <p>
                            The proof of concept requires that when a user
                            transfers a MTK token, two tokens are generated, one
                            PT(main token) and one YT(yeald token).
                        </p>
                    </div>
                    <div className="w-full p-5 backdrop-blur-sm bg-white/5 rounded-xl flex flex-col items-start gap-8 ">
                        <div>
                            <h2 className="font-bold text-xl">
                                Wallet Address:
                            </h2>
                            <p>
                                {userAddress != null
                                    ? userAddress.slice(0, 15) + "..."
                                    : "Disconnected"}
                            </p>
                        </div>

                        <div className="flex gap-6">
                            <h2 className="font-bold text-xl">
                                MTK: {Number(strkbal).toFixed(2)}
                            </h2>
                            <h2 className="font-bold text-xl text-purple-400">
                                PT: {Number(ptbal).toFixed(2)}
                            </h2>
                            <h2 className="font-bold text-xl text-green-400">
                                YT: {Number(ytbal).toFixed(2)}
                            </h2>
                        </div>
                    </div>
                    <div className="w-full p-5 backdrop-blur-sm bg-white/5  rounded-xl flex flex-col items-start  ">
                        <h2 className="font-bold text-xl mb-8">Deposit</h2>

                        <div className="w-full flex justify-between mb-1">
                            <p>Input</p>
                            <p>Balance: {Number(strkbal).toFixed(2)}</p>
                        </div>
                        <div className="w-full rounded-xl border-2 border-primary flex mb-4">
                            <p className="w-1/2 border-r-2 border-primary p-3">
                                MTK
                            </p>
                            <input
                                type="number"
                                onChange={(e) => {
                                    setAmount(
                                        (e.target.valueAsNumber * 10) ^ 18
                                    );
                                }}
                                className="bg-transparent ml-2 focus:outline-none counter p-3"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full rounded-xl  px-2 py-1 group border-solid border-2 border-primary text-primary hover:bg-primary hover:text-baser ease-in-out duration-500 active:bg-baser active:text-primary active:duration-0 text-lg font-bold"
                        >
                            {buttonContent()}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
