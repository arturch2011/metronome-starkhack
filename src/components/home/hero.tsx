import Link from "next/link";
import { Particles } from "../animation/particles";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    return (
        <div className="pt-20">
            <Particles className="absolute inset-0 -z-10" />
            <div className="text-center px-8">
                <div className="mb-6" data-aos="fade-down">
                    <div className="relative inline-flex before:absolute before:inset-0">
                        <Link
                            className="px-3 py-1 text-sm font-medium inline-flex items-center justify-center border rounded-full  text-slate-600 hover:text-gray-900 transition duration-150 ease-in-out w-full group border-slate-900/40"
                            href="https://docs.google.com/document/d/1vSxGAqaHfNLrFaABYi1OINBV6F43y7cbP8QT2rV8Iac/edit?usp=sharing"
                            target="_blank"
                        >
                            <span className="relative inline-flex items-center">
                                One Pager{" "}
                                <span className="tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                                    -&gt;
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>
                <h1
                    className="pb-4 font-extrabold tracking-tight text-transparent text-7xl lg:text-8xl  bg-clip-text bg-gradient-to-r from-baser via-primary to-baser"
                    data-aos="fade-down"
                >
                    Control Your Yield
                </h1>
                <p
                    className="mb-8 text-lg text-zinc-700font-medium"
                    data-aos="fade-down"
                    data-aos-delay="200"
                >
                    DEFI Platform on Starknet
                </p>
            </div>
        </div>
    );
};
