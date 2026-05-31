"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const StudentNavbar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        const q = searchQuery.trim();
        if (!q) return;

        router.push(
            `/dashboard/student/resources/search?q=${encodeURIComponent(q)}`
        );
    };

    return (
        <nav className="bg-[#0B1220] border-b border-white/10 text-white px-4 md:px-6 py-3 md:py-4 shadow-md">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">

                {/* LEFT */}
                <div className="flex items-center justify-between md:justify-start gap-6">

                    <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                        EduPortal
                    </h1>

                    <div className="flex items-center gap-4 md:gap-8">

                        <Link
                            href="/dashboard/student/ai"
                            className="text-gray-200 hover:text-white transition text-xs md:text-sm font-medium"
                        >
                            AI Chat
                        </Link>

                        <Link
                            href="/dashboard/student/resources"
                            className="text-gray-200 hover:text-white transition text-xs md:text-sm font-medium"
                        >
                            Resources
                        </Link>

                    </div>
                </div>

                {/* SEARCH */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden w-full md:w-auto">

                    <input
                        type="text"
                        placeholder="Search books, notes, lectures..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 md:px-5 py-2 bg-transparent text-white outline-none w-full md:w-64 text-sm placeholder:text-gray-400"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-gradient-to-r from-indigo-500 to-cyan-400 hover:opacity-90 px-4 md:px-5 py-2 text-sm font-semibold text-white"
                    >
                        Search
                    </button>

                </div>

            </div>
        </nav>
    );
};

export default StudentNavbar;