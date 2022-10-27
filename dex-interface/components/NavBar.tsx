import Link from "next/link";
import { useRouter } from 'next/router'

import Profile from "./Profile";

export default function NavBar() {
    const router = useRouter()

    return (
        <div className="flex flex-row w-full justify-between items-center border border-black h-20">
            <div className="text-white">Logo</div>
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
                <div className="flex flex-row ml-10">
                    <img src={"/twitter.svg"} alt="Twitter Logo" className="w-6 ml-3 cursor-pointer"></img>
                    <img src={"/discord.svg"} alt="Discord Logo" className="w-6 ml-3 cursor-pointer"></img>
                    <img src={"/telegram.svg"} alt="Telegram Logo" className="w-6 ml-3 cursor-pointer"></img>
                    <img src={"/medium.svg"} alt="Medium Logo" className="w-6 ml-3 cursor-pointer"></img>
                    <img src={"/github.svg"} alt="Github Logo" className="w-6 ml-3 cursor-pointer"></img>
                </div>
            </div>
            <Profile />
        </div>
    );
}