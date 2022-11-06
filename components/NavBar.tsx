import Link from "next/link";
import { useRouter } from 'next/router'

import Profile from "./Profile";

export default function NavBar() {
    const router = useRouter()

    return (
        <div className="px-20 flex flex-row w-full justify-between items-center border border-black h-20">
            <div className="text-white">
                <Link href="/">
                    Logo    
                </Link>       
            </div>
            <div className="flex justify-between items-center">
                <div className={router.pathname === "/markets" ? "ml-5 text-themeOrange font-bold" : "ml-5 text-white"}>
                    <Link href="/markets">
                        Markets
                    </Link>
                </div>
                <div className={router.pathname === "/account" ? "ml-5 text-themeOrange font-bold" : "ml-5 text-white"}>
                    <Link href="/account" className="ml-3">
                        Account
                    </Link>
                </div>
                <div className="ml-5  text-white">
                    <a href="https://stark-x.gitbook.io/docs/" target="_blank">GitBook</a>
                </div>
                <div className="flex flex-row ml-20">
                <a href="https://twitter.com/starkxdex" target="_blank">
                    <img src={"/twitter.svg"} alt="Twitter Logo" className="w-6 ml-3 cursor-pointer"></img>
                </a>
                <a href="https://discord.gg/vgEzd8ddAC" target="_blank">
                    <img src={"/discord.svg"} alt="Discord Logo" className="w-6 ml-3 cursor-pointer"></img>
                </a>
                <a href="https://t.me/starkxdex" target="_blank">
                    <img src={"/telegram.svg"} alt="Telegram Logo" className="w-6 ml-3 cursor-pointer"></img>
                </a>
                <a href="https://medium.com/@starkxdex" target="_blank">
                    <img src={"/medium.svg"} alt="Medium Logo" className="w-6 ml-3 cursor-pointer"></img>
                </a>
                <a href="https://github.com/stark-dex" target="_blank">
                    <img src={"/github.svg"} alt="Github Logo" className="w-6 ml-3 cursor-pointer"></img>
                </a>
                </div>
            </div>
            <div className="flex flex-row justify-end w-80">
                <Profile />
            </div>
        </div>
    );
}