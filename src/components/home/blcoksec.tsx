"use client";

import { motion } from "framer-motion";
import React from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { SiHiveBlockchain } from "react-icons/si";
import { GrDirections } from "react-icons/gr";
import { MdSecurity } from "react-icons/md";
import { PiCubeTransparentDuotone } from "react-icons/pi";
import { FaLink } from "react-icons/fa6";

interface CardProps {
    title: string;
    subtitle: string;
    Icon: React.ComponentType<any>;
}

const Card: React.FC<CardProps> = ({ title, subtitle, Icon }) => {
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.5,
            },
        },
    };
    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            className="flex w-full h-full items-center justify-center py-5 md:py-10 px-4"
        >
            <div className="w-full p-4 rounded-xl  relative overflow-hidden group bg-white/10 backdrop-blur-2xl border border-white/25 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-cprimary to-dprimary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

                <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-600/10 group-hover:text-cprimary group-hover:rotate-12 transition-transform duration-300" />
                <Icon className="mb-2 text-2xl text-primary group-hover:text-black transition-colors relative z-10 duration-300" />
                <h3 className="font-medium text-lg text-slate-400 group-hover:text-slate-950  relative z-10 duration-300">
                    {title}
                </h3>
                <p className="text-slate-500  relative z-10 duration-300">
                    {subtitle}
                </p>
            </div>
        </motion.div>
    );
};

const BlockSec = () => {
    return (
        <div className="w-full  max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 ">
            <div className="flex flex-col justify-center items-center p-5">
                <motion.h1
                    className="text-2xl md:text-4xl"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    Unlocking the Power of Yield Trading on Starknet
                </motion.h1>
                <motion.p
                    className="mt-4"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Many users leverage liquidity pools as a form of fixed
                    income, but seasoned investors crave something more: yield
                    trading, a common practice in traditional markets, yet
                    untapped in Web3.
                </motion.p>
            </div>
            <span />
            <Card
                title="Flexible Yield Tokens"
                subtitle="Create and customize yield tokens based on different assets, maturities and yield strategies."
                Icon={GrDirections}
            />
            <span />
            <Card
                title="Decentralized Marketplace"
                subtitle="Trade yield tokens in a secure and transparent environment, without intermediaries."
                Icon={PiCubeTransparentDuotone}
            />
            <span />
            <Card
                title="Optimized Liquidity"
                subtitle="Utilize advanced liquidity mechanisms to ensure efficient trading of yield tokens."
                Icon={SiHiveBlockchain}
            />
            <span />
            <Card
                title="Starknet Integration"
                subtitle="Leverage the scalability and security of Starknet for a superior yield trading experience."
                Icon={FaLink}
            />
        </div>
    );
};

export default BlockSec;
