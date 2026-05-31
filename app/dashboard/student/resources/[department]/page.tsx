"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Semester = {
    _id: string;
    name: string;
};

export default function SemesterPage() {
    const params = useParams();
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSemesters() {
            try {
                const res = await fetch(
                    `/api/departments/${params.department}/semesters`
                );
                const data = await res.json();
                setSemesters(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setSemesters([]);
            } finally {
                setLoading(false);
            }
        }

        if (params.department) fetchSemesters();
    }, [params.department]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-10">

                    <h1 className="text-3xl font-bold text-gray-900">
                        {decodeURIComponent(params.department as string)} - Semesters
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Select a semester to explore courses, lectures, and academic resources.
                    </p>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {/* LOADING */}
                    {loading &&
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-28 bg-white border border-gray-200 rounded-2xl animate-pulse"
                            />
                        ))}

                    {/* EMPTY STATE */}
                    {!loading && semesters.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">
                            No semesters found for this department.
                        </div>
                    )}

                    {/* DATA */}
                    {!loading &&
                        semesters.map((sem) => (
                            <Link
                                key={sem._id}
                                href={`/dashboard/student/resources/${params.department as string}/${sem._id}`}
                                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
                            >
                                <div className="flex items-center justify-between">

                                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                                        {sem.name}
                                    </h2>

                                    <span className="text-gray-300 group-hover:text-indigo-500 transition text-xl">
                                        →
                                    </span>

                                </div>

                                <p className="text-sm text-gray-500 mt-3">
                                    Click to view semester resources
                                </p>

                            </Link>
                        ))}

                </div>

            </div>
        </div>
    );
}