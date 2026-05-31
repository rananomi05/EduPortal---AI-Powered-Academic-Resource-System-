"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/users")
            .then(res => res.json())
            .then(setUsers);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* HERO (same About style) */}
            <section
                className="relative py-24 px-6 text-center text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Users
                    </h1>
                    <p className="text-gray-200 text-lg">
                        Manage system users and roles
                    </p>
                </div>
            </section>

            {/* USERS GRID */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {users.map((u) => (
                    <div
                        key={u._id}
                        className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition group"
                    >

                        {/* avatar circle */}
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition">
                            👤
                        </div>

                        <p className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                            {u.name}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            {u.email}
                        </p>

                        {/* role badge */}
                        <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                            {u.role}
                        </span>

                    </div>
                ))}

            </div>
        </div>
    );
}