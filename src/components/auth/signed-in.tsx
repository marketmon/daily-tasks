'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MainButton } from "../buttons/buttons"
import { useState } from "react"


export default function SignedIn() {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleNavigation = (path: string) => {
        router.push(path)
        setIsMenuOpen(false)
    }

    return (
        <div className="relative">
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-3 items-center">
                <div
                    className="hover:cursor-pointer"
                    onClick={() => handleNavigation('/manage/post/create')}
                >
                    <MainButton content="Create" />
                </div>
                <button
                    className="hover:cursor-pointer"
                    onClick={() => handleNavigation('/manage')}
                >
                    <MainButton content="Manage" />
                </button>
                <button
                    className="hover:cursor-pointer"
                    onClick={() => signOut()}
                >
                    <MainButton content="Sign Out" />
                </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <button
                    onClick={toggleMenu}
                    className="p-2 text-gray-600 hover:text-gray-900 text-3xl font-poppins"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? 'X' : '≡'}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className=" font-poppins absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/manage/post/create')}
                        >
                            Create
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/manage')}
                        >
                            Manage
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}