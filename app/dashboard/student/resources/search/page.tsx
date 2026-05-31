"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const params = useSearchParams();
    const query = params.get("q")?.toLowerCase() || "";

    const [files, setFiles] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // FETCH FILES
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await fetch("/api/file");
                const data = await res.json();

                console.log("FILES API:", data);

                // ✅ handle both formats
                const filesArray = Array.isArray(data)
                    ? data
                    : data.files || [];

                setFiles(filesArray);
                setFiltered(filesArray);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    // FILTER SEARCH
    useEffect(() => {
        if (!query) {
            setFiltered(files);
            return;
        }

        const result = files.filter((file) => {
            const title = file.title?.toLowerCase() || "";
            return title.includes(query);
        });

        setFiltered(result);

    }, [query, files]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-black">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    🔍 Search Results
                </h1>

                <p className="text-gray-500 mb-8">
                    Results for: <span className="font-semibold">{query}</span>
                </p>

                {loading ? (
                    <p className="text-gray-500">
                        Loading...
                    </p>
                ) : filtered.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800">
                            No results found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try searching another file title.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">

                        {filtered.map((f) => (
                            <div
                                key={f._id}
                                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {f.title}
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    {f.category || "Study Material"}
                                </p>

                                {f.url && (
                                    <a
                                        href={f.url}
                                        target="_blank"
                                        className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
                                    >
                                        Open File →
                                    </a>
                                )}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}