"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import logo from "../../../public/images/metrologo.png";

const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (!isOpen) {
                const currentScrollPos = window.pageYOffset;
                const scrollingUp = currentScrollPos < prevScrollPos;
                setIsTop(currentScrollPos < 10);
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
            className={`bg-white/20 backdrop-blur-md fixed w-full z-20 ${
                visible ? "" : "-translate-y-full"
            }`}
            initial={false}
            animate={{
                y: visible ? 0 : "-100%",
            }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-6">
                <div className="flex items-center justify-between ">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex justify-center items-center ">
                            <Image
                                src={logo}
                                alt="logo"
                                width={60}
                                height={60}
                            />
                            <h1 className="text-3xl font-bold ml-2 text-baser">
                                METRONOME
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    href="/"
                                    className="text-baser relative grouline  px-3 py-2 rounded-md text-xl font-bold"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/"
                                    className="text-baser relative grouline  px-3 py-2 rounded-md text-xl font-bold"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/"
                                    className="text-baser relative grouline  px-3 py-2 rounded-md text-xl font-bold"
                                >
                                    Team
                                </Link>
                                <Link href={"/dapp"}>
                                    <button className="rounded-xl px-3 py-2 border-solid border-2 border-primary text-primary hover:bg-baser ease-in-out duration-500 active:bg-primary active:text-white active:duration-0 text-xl font-bold">
                                        Launch App
                                    </button>
                                </Link>
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
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            className=" hover:bg-primary text-center text-baser block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/"
                            className=" hover:bg-primary text-center text-baser block px-3 py-2 rounded-md text-base font-medium"
                        >
                            About
                        </Link>
                        <Link
                            href="/"
                            className=" hover:bg-primary text-center text-baser block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Team
                        </Link>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
