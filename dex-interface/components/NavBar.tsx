import Link from "next/link";

import Profile from "./Profile";


export default function NavBar() {
    return (
        <div className="flex flex-row w-full justify-between border border-black">
            <div>Logo</div>
            <div className="flex justify-between">
                <Link href="/markets" className="ml-3">
                    Markets
                </Link>
                <div className="ml-3">Account</div>
                <div className="ml-3">GitBook</div>
                <div className="flex flex-row mx-3">
                    <div>Twitter</div>
                    <div>Discord</div>
                    <div>Telegram</div>
                    <div>Medium</div>
                    <div>Github</div>
                </div>
            </div>
            <Profile />
        </div>
    );
}