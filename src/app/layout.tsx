import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { StarknetProvider } from "@/components/starknet-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Metronome",
    description: "Metronome Finance",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${cairo.className} bg-white text-baser`}>
                <StarknetProvider>{children}</StarknetProvider>
            </body>
        </html>
    );
}
