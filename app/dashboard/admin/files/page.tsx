"use client";

import { useEffect, useState } from "react";

export default function FilesPage() {
    const [files, setFiles] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/files")
            .then(res => res.json())
            .then(setFiles);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* HERO (same as About page style) */}
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
                        Files
                    </h1>
                    <p className="text-gray-200 text-lg">
                        Access and download academic resources
                    </p>
                </div>
            </section>

            {/* FILES GRID */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {files.map((f) => (
                    <a
                        key={f._id}
                        href={f.url}
                        className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition"
                    >
                        {/* icon style block */}
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
                            📄
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                            {f.title}
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            Click to open file
                        </p>
                    </a>
                ))}

            </div>
        </div>
    );
}