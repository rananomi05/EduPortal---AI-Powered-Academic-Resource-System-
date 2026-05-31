"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Department = {
    _id: string;
    name: string;
};

/* 🎯 AUTO IMAGE SYSTEM */
const departmentData: Record<
    string,
    {
        desc: string;
        image: string;
    }
> = {
    biology: {
        desc: "Genetics, microbiology, biotechnology, and biological science resources.",
        image:
            "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1600&auto=format&fit=crop",
    },

    business: {
        desc: "Management, finance, and business strategy resources.",
        image:
            "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1600&auto=format&fit=crop",
    },

    chemistry: {
        desc: "Organic, inorganic, and analytical chemistry resources.",
        image:
            "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1600&auto=format&fit=crop",
    },

    civil: {
        desc: "Structural design, construction, and civil engineering resources.",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
    },

    computer: {
        desc: "Programming, AI, web development, and software engineering resources.",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    },

    electrical: {
        desc: "Circuits, electronics, power systems, and electrical engineering resources.",
        image:
            "data:image/jpeg;base64,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",
    },

    english: {
        desc: "Literature, grammar, writing, and communication resources.",
        image:
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600&auto=format&fit=crop",
    },

    math: {
        desc: "Algebra, calculus, statistics, and mathematical resources.",
        image:
            "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1600&auto=format&fit=crop",
    },

    mechanical: {
        desc: "Thermodynamics, mechanics, machines, and manufacturing resources.",
        image:
            "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1600&auto=format&fit=crop",
    },

    physics: {
        desc: "Mechanics, quantum physics, and research materials.",
        image:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop",
    },
};

/* 🎯 GET DATA */
const getDepartmentMeta = (name: string) => {
    const dept = name.toLowerCase();

    for (const key in departmentData) {
        if (dept.includes(key)) {
            return departmentData[key];
        }
    }

    /* fallback */
    return {
        desc: "Explore study materials, notes, and academic resources.",
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    };
};

export default function ResourcesPage() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/departments")
            .then((res) => res.json())
            .then((data) => {
                setDepartments(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setDepartments([]);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-10">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Departments
                    </h1>

                    <p className="text-gray-500 mt-2 leading-7">
                        Select your department to access study resources, notes, and academic materials.
                    </p>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-72 bg-white border border-gray-200 rounded-3xl animate-pulse"
                            />
                        ))
                        : departments.map((dept) => {
                            const meta = getDepartmentMeta(dept.name);

                            return (
                                <Link
                                    key={dept._id}
                                    href={`/dashboard/student/resources/${encodeURIComponent(
                                        dept.name
                                    )}`}
                                    className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
                                >

                                    {/* IMAGE */}
                                    <div className="h-44 overflow-hidden">
                                        <img
                                            src={meta.image}
                                            alt={dept.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-6">

                                        <div className="flex items-center justify-between">

                                            <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                                                {dept.name}
                                            </h2>

                                            <span className="text-gray-300 group-hover:text-indigo-500 transition text-xl">
                                                →
                                            </span>

                                        </div>

                                        <p className="text-gray-500 text-sm mt-3 leading-6">
                                            {meta.desc}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-4 group-hover:text-indigo-500 transition">
                                            Click to explore resources
                                        </p>

                                    </div>
                                </Link>
                            );
                        })}

                </div>

            </div>
        </div>
    );
}