"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link
                        href="../Home"
                        className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent tracking-wide"
                    >
                        EduPortal
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">

                        {/* Nav Links */}
                        <div className="flex items-center gap-8 text-gray-300 font-medium">
                            <Link
                                href="../Home"
                                className="hover:text-white transition duration-300"
                            >
                                Home
                            </Link>

                            <Link
                                href="../Features"
                                className="hover:text-white transition duration-300"
                            >
                                Features
                            </Link>

                            <Link
                                href="../About"
                                className="hover:text-white transition duration-300"
                            >
                                About
                            </Link>

                            <Link
                                href="../Contact"
                                className="hover:text-white transition duration-300"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        {!session ? (
                            <div className="flex items-center gap-4 ml-6">
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 rounded-xl border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition duration-300"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg hover:scale-105 transition duration-300"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 ml-6">
                                <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-200">
                                    {session.user?.name} ({session.user?.role})
                                </div>

                                <button
                                    onClick={() => signOut()}
                                    className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white bg-white/10 p-2 rounded-lg border border-white/10"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#111827] border-t border-white/10 shadow-2xl">
                    <div className="px-6 py-6 flex flex-col gap-5 text-gray-300 font-medium">

                        <Link
                            href="../Home"
                            className="hover:text-white transition"
                        >
                            Home
                        </Link>

                        <Link
                            href="../Features"
                            className="hover:text-white transition"
                        >
                            Features
                        </Link>

                        <Link
                            href="../About"
                            className="hover:text-white transition"
                        >
                            About
                        </Link>

                        <Link
                            href="../Contact"
                            className="hover:text-white transition"
                        >
                            Contact
                        </Link>

                        <div className="border-t border-white/10 pt-5">
                            {session && (
                                <Link
                                    href="/dashboard"
                                    className="block mb-4 hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            )}

                            {!session ? (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/login"
                                        className="w-full text-center px-4 py-3 rounded-xl border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white transition"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="text-sm text-gray-300 bg-white/10 p-3 rounded-xl">
                                        {session.user?.name} ({session.user?.role})
                                    </div>

                                    <button
                                        onClick={() => signOut()}
                                        className="w-full px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}