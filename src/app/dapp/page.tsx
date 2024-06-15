"use client";

import { Particles } from "@/components/animation/particles";
import Image from "next/image";
import strklogo from "../../../public/images/metrologoc.png";
import Link from "next/link";

export default function Dapp() {
    return (
        <div className="min-h-screen w-full">
            <Particles className="absolute inset-0 -z-10" />
            <section className=" py-20 px-10 ">
                <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-5xl font-bold">Proof of Concept</h1>
                        <p className="text-xl max-w-96">
                            The proof of concept requires that when a user
                            transfers a MTK token, two tokens are generated, one
                            PT(main token) and one YT(yeald token).
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-screen-2xl mx-auto">
                    <Link href={"/dapp/yeald"}>
                        <div className="relative w-full p-5 backdrop-blur-sm bg-white/5 rounded-xl flex flex-col sombra hover:border-[1px] hover:border-primary">
                            <h1 className="text-2xl font-bold mb-4">MTK</h1>
                            <p>UP TO</p>
                            <p className="text-2xl font-bold text-primary">
                                --.-- %
                            </p>
                            <Image
                                src={strklogo}
                                alt="strk logo"
                                width={80}
                                height={80}
                                className="absolute right-10 top-[-30px] bg-baser p-3 rounded-full border-2 border-primary"
                            />
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
