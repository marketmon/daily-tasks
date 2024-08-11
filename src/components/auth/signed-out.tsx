'use client'
import { signIn } from "next-auth/react"


export default function SignedOut() {
    return (
        <div>
            <button onClick={() => { signIn() }}>
                SIGN IN
            </button>
        </div>
    )
}