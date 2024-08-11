import Link from "next/link"
import SignedIn from "./auth/signed-in"
import SignedOut from "./auth/signed-out"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function HeaderNavBar() {

    const session = await getServerSession(authOptions);

    return (
        <div className="w-full p-3 flex font-radley font-medium tracking-wide">
            <div className="w-1/2">
                <div className="bg-accent w-fit p-2 text-white text-sm flex justify-center items-center h-8">
                    <Link href='/'>
                        HOME
                    </Link>
                </div>
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