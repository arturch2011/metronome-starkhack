"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo } from "react";
import Link from "next/link";
import logo from "../../../public/images/metrologoc.png";

const Dappbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showWalletPopup, setShowWalletPopup] = useState(false);
    const { connectors, connect } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const [showDrop, setShowDrop] = useState(false);

    const shortenedAddress = useMemo(() => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }, [address]);

    const handleConnectWalletClick = () => {
        setShowWalletPopup(true);
    };

    const handleDisconnect = () => {
        disconnect();
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!isOpen) {
                const currentScrollPos = window.pageYOffset;
                const scrollingUp = currentScrollPos < prevScrollPos;
                setVisible(scrollingUp || currentScrollPos < 10);
                setPrevScrollPos(currentScrollPos);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, isOpen]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.nav
            className={`bg-white/10 backdrop-blur-sm fixed w-full z-20 ${
                visible ? "" : "-translate-y-full"
            }`}
            initial={false}
            animate={{
                y: visible ? 0 : "-100%",
            }}
            transition={{ duration: 0.3 }}
        >
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center justify-between ">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex justify-center items-center gap-8">
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="logo"
                                    width={35}
                                    height={35}
                                />
                            </Link>

                            <Link
                                href="/"
                                className="text-dprimary text-sm hover:text-primary  p-1   font-bold"
                            >
                                PoC
                            </Link>
                            <Link
                                href="/"
                                className="text-dprimary text-sm hover:text-primary  p-1   font-bold"
                            >
                                Markets
                            </Link>
                            <Link
                                href="/"
                                className="text-dprimary text-sm hover:text-primary  p-1   font-bold"
                            >
                                Pools
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4 ">
                                <button
                                    onClick={
                                        address
                                            ? () => setShowDrop(!showDrop)
                                            : handleConnectWalletClick
                                    }
                                    className="flex rounded-xl px-2 py-1 group border-solid border-2 border-primary text-primary hover:bg-primary hover:text-baser ease-in-out duration-500 active:bg-baser active:text-primary active:duration-0 text-sm font-bold"
                                >
                                    <h1>
                                        {address
                                            ? shortenedAddress
                                            : "Connect Wallet"}
                                    </h1>

                                    {address ? (
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 36 37"
                                            fill="none"
                                            className="transition-transform w-6 md:w-9"
                                            initial={{ rotate: 0 }}
                                            animate={{
                                                rotate: showDrop ? 180 : 0,
                                            }}
                                            transition={{ duration: 0.05 }}
                                        >
                                            <path
                                                d="M5.67578 12.5884L17.999 24.9116L30.3223 12.5884"
                                                stroke="white"
                                                strokeOpacity="0.6"
                                                strokeWidth="3"
                                            ></path>
                                        </motion.svg>
                                    ) : (
                                        <span></span>
                                    )}
                                    {showDrop && (
                                        <motion.div
                                            initial={{ y: -5, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="md:absolute  mt-2 right-8  md:mt-8 border-solid border-2 text-primary  border-primary flex flex-col items-center rounded-lg  bg-baser group-hover:bg-primary group-hover:text-baser ease-in-out duration-500"
                                        >
                                            <Link
                                                onClick={handleDisconnect}
                                                href={"/"}
                                                className="py-2 px-5  w-full rounded-t-md  hover:text-primary text-start  hover:bg-baser"
                                            >
                                                Copy Address
                                            </Link>
                                            <button
                                                onClick={handleDisconnect}
                                                className="py-2 px-5  w-full  hover:text-primary text-start hover:bg-baser"
                                            >
                                                Open in Voyager
                                            </button>
                                            <button
                                                onClick={handleDisconnect}
                                                className="py-2 px-5  w-full rounded-b-md hover:text-primary text-start hover:bg-baser"
                                            >
                                                Disconnect
                                            </button>
                                        </motion.div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mr-2 flex md:hidden">
                        <button
                            onClick={toggleNavbar}
                            className="inline-flex items-center justify-center p-2 rounded-md text-baser hover:bg-primary focus:outline-none  "
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {showWalletPopup && (
                <div className="absolute h-screen inset-0 flex items-center justify-center  ">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-baser px-6 pb-6 rounded-2xl flex flex-col justify-center shadow-2xl"
                    >
                        <div className="flex justify-between">
                            <h1 className="font-bold text-xl mb-4 my-6 pr-10">
                                Chose your wallet
                            </h1>
                            <button onClick={() => setShowWalletPopup(false)}>
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

                        <div className="flex gap-4">
                            {connectors.map((connector) => {
                                return (
                                    <button
                                        key={connector.id}
                                        onClick={() => {
                                            connect({ connector });
                                            setShowWalletPopup(false);
                                        }}
                                        className="rounded-xl px-2 py-1 border-solid border-2 border-primary text-primary hover:bg-primary hover:text-baser ease-in-out duration-500 font-bold"
                                    >
                                        {connector.name}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            )}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
                </div>
            )}
        </motion.nav>
    );
};

export default Dappbar;
