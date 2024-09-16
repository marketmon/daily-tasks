'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MainButton } from "../buttons/buttons";

export default function SignedIn() {
    const router = useRouter();

    return (
        <div className="flex gap-3">
            <div
                className="hover:cursor-pointer"
                onClick={() => { router.push('/manage/post/create') }}
            >
                <MainButton content="CREATE" />
            </div>
            <button
                className="hover:cursor-pointer"
                onClick={() => { router.push('/manage') }}
            >
                <MainButton content="MANAGE" />
            </button>
            <button
                className="hover:cursor-pointer"
                onClick={() => { signOut() }}>
                <MainButton content="SIGN OUT" />
            </button>

        </div>
    )
}