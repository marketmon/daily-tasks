'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignedIn() {
    const router = useRouter();

    return (
        <div className="flex gap-3">
            <button onClick={() => { router.push('/manage') }}>
                MANAGE
            </button>
            <button onClick={() => { signOut() }}>
                SIGN OUT
            </button>

        </div>
    )
}