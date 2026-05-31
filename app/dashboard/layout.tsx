"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const role = session?.user.role;

    const [open, setOpen] = useState(false);

    // lock scroll when mobile menu open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row text-white">

            {/* TOP BAR (MOBILE ONLY) */}
            <div className="md:hidden flex items-center justify-between bg-[#0F172A] border-b border-white/10 px-4 py-3">
                <h1 className="text-lg font-bold text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text">
                    EduPortal
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="text-white text-2xl"
                >
                    ☰
                </button>
            </div>

            {/* OVERLAY */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            {/* SIDEBAR (UNCHANGED DESKTOP, MODIFIED MOBILE ONLY) */}
            <aside
                className={`
                    bg-[#0F172A] border-r border-white/10 flex flex-col
                    w-72 z-50
                    md:static md:translate-x-0 md:h-auto md:block
                    fixed top-0 left-0 h-full
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >

                {/* CLOSE BUTTON (MOBILE ONLY) */}
                <div className="md:hidden flex justify-end p-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-white text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* BRAND */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                        EduPortal
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        Smart Academic System
                    </p>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 p-5 space-y-3 text-sm">

                    {role === "admin" && (
                        <Link onClick={() => setOpen(false)}
                            href="/dashboard/admin"
                            className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
                        >
                            Admin Home
                        </Link>
                    )}

                    {(role === "faculty" || role === "admin") && (
                        <Link onClick={() => setOpen(false)}
                            href="/dashboard/faculty"
                            className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
                        >
                            Faculty Upload
                        </Link>
                    )}

                    <Link onClick={() => setOpen(false)}
                        href="/dashboard/student"
                        className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
                    >
                        Student Dashboard
                    </Link>

                    <Link onClick={() => setOpen(false)}
                        href="/dashboard/student/resources"
                        className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
                    >
                        Resources
                    </Link>

                    <Link onClick={() => setOpen(false)}
                        href="/dashboard/student/ai"
                        className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
                    >
                        AI Assistant
                    </Link>
                </nav>

                {/* USER INFO (UNCHANGED — DESKTOP POSITION SAME) */}
                <div className="p-5 border-t md:mt-220 border-white/10">

                    <div className="text-sm text-gray-300 mb-4">
                        {session?.user?.name}
                        <div className="text-xs text-gray-500">
                            Role: {role}
                        </div>
                    </div>

                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT (UNCHANGED DESKTOP LAYOUT) */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

        </div>
    );
}