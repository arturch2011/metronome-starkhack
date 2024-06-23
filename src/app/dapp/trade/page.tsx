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
import { MdSwapVert } from "react-icons/md";
import { motion } from "framer-motion";

import { useState, useMemo, use } from "react";

export default function Yeald() {
    const { address: userAddress } = useAccount();
    const [amount, setAmount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

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
            return <LoadingState message="Swap..." />;
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

        return "Swap";
    };

    return (
        <div className="min-h-screen w-full">
            <section className=" py-28 px-10 w-full flex items-center justify-center">
                <div className="flex flex-col w-full max-w-xl gap-8">
                    <div className="inline-flex items-center justify-start ">
                        <Link
                            href={"/dapp"}
                            className="flex rounded-xl  px-2 py-1  border-solid border-2 border-primary text-primary hover:bg-primary hover:text-baser ease-in-out duration-500 active:bg-baser active:text-primary active:duration-0 text-lg font-bold"
                        >
                            &lt;
                        </Link>
                    </div>
                    <h1 className="font-bold text-3xl">Swap</h1>

                    <div className="w-full p-5 backdrop-blur-sm bg-white/5  rounded-xl flex flex-col items-start  ">
                        <div className="w-full flex justify-between mb-1">
                            <p>Input</p>
                            <p>Balance: {Number(strkbal).toFixed(2)}</p>
                        </div>
                        <div className="w-full rounded-xl border-2 border-primary flex overflow-hidden">
                            <input
                                type="number"
                                onChange={(e) => {
                                    setAmount(
                                        (e.target.valueAsNumber * 10) ^ 18
                                    );
                                }}
                                className="bg-transparent w-2/3 focus:outline-none counter p-3"
                            />
                            <button
                                onClick={() => setShowPopup(true)}
                                className=" border-l-2 border-primary text-primary hover:bg-primary hover:text-baser w-1/3 ease-in-out duration-500  p-3 active:bg-baser active:text-primary active:duration-0 font-bold"
                            >
                                MTK
                            </button>
                        </div>
                        <MdSwapVert className="self-center text-primary text-4xl my-2" />

                        <div className="w-full rounded-xl border-2 border-primary flex overflow-hidden mb-4">
                            <input
                                type="number"
                                onChange={(e) => {
                                    setAmount(
                                        (e.target.valueAsNumber * 10) ^ 18
                                    );
                                }}
                                className="bg-transparent w-2/3 focus:outline-none counter p-3"
                            />
                            <button
                                onClick={() => setShowPopup(true)}
                                className=" border-l-2 border-primary text-primary hover:bg-primary hover:text-baser w-1/3 ease-in-out duration-500  p-3 active:bg-baser active:text-primary active:duration-0 font-bold"
                            >
                                STRK
                            </button>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full rounded-xl  px-2 py-1 group border-solid border-2 border-primary text-primary hover:bg-primary hover:text-baser ease-in-out duration-500 active:bg-baser active:text-primary active:duration-0 text-lg font-bold"
                        >
                            {buttonContent()}
                        </button>
                    </div>
                </div>
                {showPopup && (
                    <div className="absolute h-screen inset-0 flex items-center justify-center  ">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-baser px-6 pb-6 rounded-2xl flex flex-col justify-center shadow-2xl"
                        >
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl mb-4 my-6 pr-10">
                                    Chose a token
                                </h1>
                                <button onClick={() => setShowPopup(false)}>
                                    <svg
                                        className="h-6 w-6 hover:bg-primary ease-in-out duration-500 inline-flex items-center justify-center  rounded-md"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex gap-4"></div>
                        </motion.div>
                    </div>
                )}
            </section>
        </div>
    );
}
