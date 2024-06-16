import { Particles } from "@/components/animation/particles";
import Dappbar from "@/components/dapp/dappbar";

export default function DappLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <body className="bg-dbase text-white">
            <main className="min-h-screen w-full  ">
                <Dappbar />
                <Particles color="#f3aca3" className="absolute inset-0 -z-10" />
                {children}
            </main>
        </body>
    );
}
