'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MainButton } from "../buttons/buttons";

export default function SignedIn() {
    const router = useRouter();

    return (
        <div className="flex gap-3 items-center">
            <div
                className="hover:cursor-pointer"
                onClick={() => { router.push('/manage/post/create') }}
            >
                <MainButton content="Create" />
            </div>
            <button
                className="hover:cursor-pointer"
                onClick={() => { router.push('/manage') }}
            >
                <MainButton content="Manage" />
            </button>
            <button
                className="hover:cursor-pointer"
                onClick={() => { signOut() }}>
                <MainButton content="Sign Out" />
            </button>

        </div>
    )
}