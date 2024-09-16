import Link from "next/link"
import SignedIn from "./auth/signed-in"
import SignedOut from "./auth/signed-out"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import { MainButton } from "./buttons/buttons";

export default async function HeaderNavBar() {

    const session = await getServerSession(authOptions);

    return (
        <div className="w-full p-3 flex font-radley font-medium tracking-wide">
            <div className="w-1/2">
                <Link href='/'>
                    <MainButton content="HOME" />
                </Link>
            </div>
            <div className="w-1/2 flex justify-end">
                {session ?
                    <SignedIn />
                    :
                    <SignedOut />
                }
            </div>
        </div>
    )
}