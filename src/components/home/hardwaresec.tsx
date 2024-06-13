"use client";

import { motion } from "framer-motion";

const HardwareSec = () => {
    return (
        <motion.section
            className="w-full min-h-screen flex flex-col items-center justify-center py-20 px-8 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="mb-20 mx-auto w-full flex flex-col gap-4 justify-center items-center">
                <motion.h2
                    className="text-2xl md:text-6xl font-bold text-center"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Metronome emerges, bringing yield trading to the Starknet
                    ecosystem.
                </motion.h2>
                <motion.p
                    className="text-xl md:text-2xl text-center"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Currently, most DeFi platforms offer limited options for
                    yield optimization. Metronome changes this by allowing users
                    to trade their future yields, transforming them into present
                    value.
                </motion.p>
            </div>
            <div className="w-full  max-w-screen-2xl grid grid-cols-1  md:grid-cols-tres">
                <motion.div
                    className="md:border-0 border-b border-solid border-primary  overflow-hidden"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="text-center h-full flex flex-col items-center py-20 px-10">
                        <div className="max-w-md flex-1 flex flex-col items-center">
                            <motion.h1
                                className="mt-4 text-2xl md:text-4xl"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                Metronome and Yield Tokens
                            </motion.h1>
                            <motion.p
                                className="mt-4"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                Introduces Metronome and its core function of
                                creating yield tokens that represent future
                                yields.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
                <motion.span
                    className="hidden md:block w-1 h-full bg-cprimary"
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.div
                    className="md:border-0 border-b border-solid border-primary  overflow-hidden"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="text-center h-full flex flex-col items-center py-20 px-10">
                        <div className="max-w-md flex-1 flex flex-col items-center">
                            <motion.h1
                                className="mt-4 text-2xl md:text-4xl"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                Smart Contracts and Cairo
                            </motion.h1>
                            <motion.p
                                className="mt-4"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                Highlights the technology behind Metronome,
                                using smart contracts written in Cairo to create
                                these yield tokens.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
                <motion.span
                    className="hidden md:block w-full h-1 bg-cprimary col-span-3"
                    initial={{ x: -300, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                />
                <motion.div
                    className="md:border-0 border-b border-solid border-primary overflow-hidden"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="text-center h-full flex flex-col items-center py-20 px-10">
                        <div className="max-w-md flex-1 flex flex-col items-center">
                            <motion.h1
                                className="mt-4 text-2xl md:text-4xl"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                Trading and Value Capture
                            </motion.h1>
                            <motion.p
                                className="mt-4"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                Emphasizes the ability to trade these yield
                                tokens, unlocking the potential to capture value
                                from yields before they are realized.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
                <motion.span
                    className="hidden md:block w-1 h-full bg-cprimary"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.div
                    className="md:border-0 border-b border-solid border-primary  overflow-hidden"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="text-center h-full flex flex-col items-center py-20 px-10">
                        <div className="max-w-md flex-1 flex flex-col items-center">
                            <motion.h1
                                className="mt-4 text-2xl md:text-4xl"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                Zero-Knowledge Technology
                            </motion.h1>
                            <motion.p
                                className="mt-4"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                Explains how zk-rollup technology, based on
                                zero-knowledge proofs, improves network
                                scalability by validating transactions
                                off-chain.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HardwareSec;
