import Link from "next/link";
import { Separator } from "../ui/separator";
import { Avatar } from "@mui/material";

export const Channels = () => {
    const channels = [
        {
            logo: "/profile2.jpeg",
            name: "Artur",
            link: "/",
        },
        {
            logo: "/profile3.jpeg",
            name: "Lucas",
            link: "/",
        },
        {
            logo: "/profile4.jpeg",
            name: "David",
            link: "/",
        },
        {
            logo: "/profile5.jpeg",
            name: "Marlon",
            link: "/",
        },
    ];
    // Avatar Styles
    const style = {
        width: {
            xs: 50, // width on extra-small devices
            sm: 100, // width on small devices
            md: 150, // default width
        },
        height: {
            xs: 50, // height on extra-small devices
            sm: 100, // height on small devices
            md: 150, // default height
        },
        // You can add more responsive keys (lg, xl) as needed
    };
    return (
        <div className="text-center">
            <h1 className="pb-4 font-bold tracking-tight text-5xl lg:text-6xl ">
                Our Team
            </h1>
            <div className="flex items-center justify-center">
                <Separator className="mt-3 bg-slate-100/20 h-0.5 w-40" />
            </div>

            <div className="flex items-center justify-center mx-auto sm:space-x-2 md:space-x-4 lg:space-x-8">
                {channels.map((channel, index) => (
                    <div key={index} className="mt-10 flex">
                        <div className="flex flex-col items-center">
                            <Link href={`${channel.link}`}>
                                <Avatar
                                    src={channel.logo}
                                    alt={channel.name}
                                    sx={style}
                                />
                            </Link>
                            <h1 className="font-semibold text-xl mt-4">
                                {channel.name}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
