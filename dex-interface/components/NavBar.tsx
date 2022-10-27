import Link from "next/link";

import Profile from "./Profile";

export default function NavBar() {
    return (
        <div className="flex flex-row w-full justify-between border border-black">
            <div className="text-white">Logo</div>
            <div className="flex justify-between">
                <div className="ml-3 text-white">
                    <Link href="/markets">
                        Markets
                    </Link>
                </div>
                <div className="ml-3  text-white">
                    <Link href="/account" className="ml-3">
                        Account
                    </Link>
                </div>
                <div className="ml-3  text-white">GitBook</div>
                <div className="flex flex-row mx-3">
                    <img src={"/twitter.svg"} alt="Twitter Logo"></img>
                    <img src={"/discord.svg"} alt="Discord Logo"></img>
                    <img src={"/telegram.svg"} alt="Telegram Logo"></img>
                    <img src={"/medium.svg"} alt="Medium Logo"></img>
                    <img src={"/github.svg"} alt="Github Logo"></img>
                </div>
            </div>
            <Profile />
        </div>
    );
}