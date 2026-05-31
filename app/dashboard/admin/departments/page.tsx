"use client";

import { useEffect, useState } from "react";

type Dept = {
    _id: string;
    name: string;
    description?: string;
};

export default function DepartmentsPage() {
    const [data, setData] = useState<Dept[]>([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetch("/api/departments")
            .then(res => res.json())
            .then(setData);
    }, []);

    const addDept = async () => {
        await fetch("/api/departments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });

        setName("");
        location.reload();
    };

    const remove = async (id: string) => {
        await fetch(`/api/departments/${id}`, { method: "DELETE" });
        location.reload();
    };

    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* HERO (same style as About page) */}
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
                        Departments
                    </h1>
                    <p className="text-gray-200 text-lg">
                        Manage academic departments
                    </p>
                </div>
            </section>

            {/* INPUT SECTION (About page card style) */}
            <div className="max-w-6xl mx-auto px-6 mt-14">
                <div className="flex flex-col md:flex-row gap-4">

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Add new department..."
                        className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />

                    <button
                        onClick={addDept}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-sm"
                    >
                        Add Department
                    </button>

                </div>
            </div>

            {/* CARDS (same as About stats/cards) */}
            <div className="max-w-6xl mx-auto px-6 mt-12 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">

                {data.map((d) => (
                    <div
                        key={d._id}
                        className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            {d.name}
                        </h2>

                        <p className="text-gray-500 text-sm">
                            Academic department
                        </p>

                        <button
                            onClick={() => remove(d._id)}
                            className="mt-6 text-red-500 hover:text-red-600 font-medium"
                        >
                            Delete
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
}