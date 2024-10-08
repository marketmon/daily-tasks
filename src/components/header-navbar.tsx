import Link from "next/link"
import SignedIn from "./auth/signed-in"
import SignedOut from "./auth/signed-out"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import { MainButton } from "./buttons/buttons";
import Image from "next/image";

export default async function HeaderNavBar() {

    const session = await getServerSession(authOptions);

    return (
        <div className="w-full p-2 mb-2 flex font-radley font-medium tracking-wide bg-opacity-50 rounded">
            <div className="w-1/2 flex gap-3 items-center">
                <Link href='https://panbo.app'>
                    <Image src="/favicon.ico" alt="panbo logo" height={40} width={40} />
                </Link>
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