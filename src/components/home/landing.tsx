"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Hero } from "./hero";
import { Channels } from "./channels";
import { Footer } from "./footer";
import BlockSec from "./blcoksec";
import HardwareSec from "./hardwaresec";
import Navbar from "../layout/navbar";

export const LandingPage = () => {
    // Data AOS Animations
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 800,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pt-32 pb-16 md:pt-52 md:pb-32 relative max-w-7xl min-h-screen px-4 mx-auto sm:px-6 space-y-80">
                {/* Hero */}
                <Hero />
                <BlockSec />
                <HardwareSec />

                {/* Channels Worked With*/}
                <Channels />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};
