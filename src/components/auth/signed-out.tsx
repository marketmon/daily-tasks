'use client'
import { signIn } from "next-auth/react"


export default function SignedOut() {
    return (
        <div>
            <button
                className="rounded border-2 border-black px-2 font-roboto hover:bg-black hover:text-white"
                onClick={() => { signIn() }}
            >
                SIGN IN
            </button>
        </div>
    )
}