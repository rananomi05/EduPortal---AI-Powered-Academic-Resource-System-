"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function AdminHome() {
    const { data: session } = useSession();

    const cards = [
        { title: "Departments", icon: "🏢", link: "/dashboard/admin/departments" },
        { title: "Semesters", icon: "📅", link: "../../dashboard/admin/semesters" },
        { title: "Subjects", icon: "📚", link: "../../dashboard/admin/subjects" },
        { title: "Files", icon: "📂", link: "../../dashboard/admin/files" },
        { title: "Users", icon: "👥", link: "../../dashboard/admin/users" },
        { title: "Settings", icon: "⚙️", link: "../../dashboard/admin/settings" },
    ];

    const stats = [
        { label: "Total Users", value: "1,240", color: "text-blue-600" },
        { label: "Departments", value: "6", color: "text-indigo-600" },
        { label: "Files Uploaded", value: "320", color: "text-green-600" },
        { label: "Active Sessions", value: "48", color: "text-orange-500" },
    ];

    const chartData = [
        { day: "Mon", value: 40 },
        { day: "Tue", value: 70 },
        { day: "Wed", value: 55 },
        { day: "Thu", value: 90 },
        { day: "Fri", value: 65 },
        { day: "Sat", value: 30 },
        { day: "Sun", value: 50 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            {/* HERO (same style as About/Home) */}
            <section
                className="relative py-24 px-6 text-center text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-200 mt-3 text-lg">
                        Welcome {session?.user?.name || "Admin"} • Role:{" "}
                        {(session?.user as any)?.role || "admin"}
                    </p>
                </div>
            </section>

            {/* STATS */}
            <section className="max-w-6xl mt-20 mx-auto px-6 -mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">

                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
                    >
                        <p className="text-sm text-gray-500">{s.label}</p>
                        <h2 className={`text-3xl font-bold mt-2 ${s.color}`}>
                            {s.value}
                        </h2>
                    </div>
                ))}

            </section>

            {/* CHART + QUICK ACTIONS */}
            <section className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">

                {/* REAL CHART */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 text-gray-700">
                        Weekly Activity
                    </h2>

                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="value"
                                    fill="#185FA5"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 text-gray-700">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {cards.map((c) => (
                            <Link key={c.title} href={c.link}>
                                <div className="p-5 rounded-2xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-center">
                                    <div className="text-3xl">{c.icon}</div>
                                    <p className="mt-2 font-semibold text-gray-700">
                                        {c.title}
                                    </p>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>

            </section>

            {/* SYSTEM STATUS */}
            <section className="max-w-6xl mx-auto px-6 mt-10">

                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                    <h2 className="text-xl font-semibold mb-6 text-gray-700">
                        System Status
                    </h2>

                    <div className="space-y-4">

                        {[
                            { name: "Database", status: "Healthy", color: "bg-green-500" },
                            { name: "API Server", status: "Running", color: "bg-blue-500" },
                            { name: "Storage", status: "75% Used", color: "bg-yellow-500" },
                        ].map((s, i) => (
                            <div key={i} className="flex justify-between items-center">

                                <p className="text-gray-600">{s.name}</p>

                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${s.color}`} />
                                    <span className="text-sm text-gray-500">
                                        {s.status}
                                    </span>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center text-gray-400 text-sm py-10 mt-10">
                EduPortal Admin Panel • Academic Management System
            </footer>

        </div>
    );
}