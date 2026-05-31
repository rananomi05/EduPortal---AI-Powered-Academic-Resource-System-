"use client";

import { useEffect, useState } from "react";

type Announcement = {
    _id: string;
    title: string;
    message: string;
    priority: "Normal" | "Important" | "Urgent";
    date: string;
};

export default function StudentHome() {

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        fetch("/api/announcements")
            .then((res) => res.json())
            .then(setAnnouncements)
            .catch(() => setAnnouncements([]));
    }, []);

    const priorityBadge: Record<string, string> = {
        Normal: "bg-gray-100 text-gray-600",
        Important: "bg-yellow-100 text-yellow-700",
        Urgent: "bg-red-100 text-red-600",
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Student Dashboard
                    </h1>

                    <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                        Welcome back to EduPortal. Access your academic resources,
                        track progress, and use AI assistance to enhance learning.
                    </p>
                </div>

                {/*  ANNOUNCEMENTS (NEW) */}
                <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Latest Announcements
                    </h2>

                    <div className="space-y-4">
                        {announcements.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No announcements yet.
                            </p>
                        ) : (
                            announcements.map((a) => (
                                <div
                                    key={a._id}
                                    className="p-5 rounded-2xl border border-gray-100 bg-gray-50"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-900">
                                            {a.title}
                                        </h3>

                                        <span className={`text-xs px-3 py-1 rounded-full ${priorityBadge[a.priority]}`}>
                                            {a.priority}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                        {a.message}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-2">
                                        {a.date}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>


                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {[
                        { title: "Total Resources", value: "120+", desc: "PDFs, notes & lectures", color: "text-indigo-600" },
                        { title: "AI Queries", value: "45", desc: "Questions asked this week", color: "text-cyan-600" },
                        { title: "Progress", value: "78%", desc: "Overall completion", color: "text-pink-600" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                            <h2 className={`font-semibold ${item.color}`}>{item.title}</h2>
                            <p className="text-3xl font-bold mt-3 text-gray-900">{item.value}</p>
                            <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* MAIN */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                    {/* QUICK ACTIONS */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-semibold mb-5 text-gray-900">
                            Quick Actions
                        </h2>

                        <ul className="space-y-4 text-gray-600">
                            {[
                                "Open AI Assistant for instant help",
                                "Browse latest uploaded resources",
                                "Check faculty announcements",
                                "Download past papers & notes"
                            ].map((item, i) => (
                                <li key={i} className="hover:text-indigo-600 transition cursor-pointer">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 shadow-lg text-white">
                        <h2 className="text-2xl font-bold">Boost Your Learning</h2>

                        <p className="text-blue-100 mt-4 mb-6 leading-7">
                            Use EduPortal AI to understand topics, solve assignments,
                            and get instant explanations anytime.
                        </p>

                        <a
                            href="/dashboard/student/ai"
                            className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                        >
                            Try AI Assistant
                        </a>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <p className="text-gray-500 text-sm">
                        Tip: Check announcements daily for updates from faculty.
                    </p>
                </div>

            </div>
        </div>
    );
}