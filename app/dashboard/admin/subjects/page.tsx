"use client";

import { useEffect, useState } from "react";

export default function SubjectsPage() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/subjects")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Subjects</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {data.map((s) => (
                    <div key={s._id} className="border rounded-2xl p-5">
                        <h2 className="font-semibold">{s.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}