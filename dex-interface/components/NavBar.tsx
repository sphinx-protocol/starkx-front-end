import Link from "next/link";

import Profile from "./Profile";


export default function NavBar() {
    return (
        <div className="flex flex-row w-full justify-between border border-black">
            <div>Logo</div>
            <div className="flex justify-between">
                <div className="ml-3">
                    <Link href="/markets">
                        Markets
                    </Link>
                </div>
                <div className="ml-3">
                    <Link href="/account" className="ml-3">
                        Account
                    </Link>
                </div>
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