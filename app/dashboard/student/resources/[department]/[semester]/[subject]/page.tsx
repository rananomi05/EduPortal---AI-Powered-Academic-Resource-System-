// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// type FileType = {
//     _id: string;
//     title: string;
//     url: string;
//     type: string;
// };

// export default function FilesPage() {
//     const params = useParams();

//     const subject = params.subject as string;

//     const [files, setFiles] = useState<FileType[]>([]);
//     const [subjectName, setSubjectName] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchFiles() {
//             try {
//                 const res = await fetch(`/api/subjects/${subject}/files`);
//                 const data = await res.json();

//                 setSubjectName(data.subjectName);
//                 setFiles(data.files);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (subject) fetchFiles();
//     }, [subject]);

//     return (
//         <div className="min-h-screen bg-gray-50 px-6 py-10">

//             <div className="max-w-5xl mx-auto">

//                 {/* HEADER */}
//                 <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-8">

//                     <h1 className="text-3xl font-bold text-gray-900">
//                         Files for{" "}
//                         <span className="text-indigo-600">{subjectName}</span>
//                     </h1>

//                     <p className="text-gray-500 mt-2">
//                         Download lecture notes, assignments, and study materials.
//                     </p>

//                 </div>

//                 {/* FILE LIST */}
//                 <div className="space-y-4">

//                     {/* LOADING */}
//                     {loading &&
//                         Array.from({ length: 5 }).map((_, i) => (
//                             <div
//                                 key={i}
//                                 className="h-16 bg-white border border-gray-200 rounded-2xl animate-pulse"
//                             />
//                         ))}

//                     {/* EMPTY */}
//                     {!loading && files.length === 0 && (
//                         <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm">

//                             <div className="text-5xl mb-3">📭</div>

//                             <h2 className="text-xl font-semibold text-gray-800">
//                                 No Files Found
//                             </h2>

//                             <p className="text-gray-500 mt-2">
//                                 There are currently no uploaded files for this subject.
//                             </p>

//                         </div>
//                     )}

//                     {/* FILES */}
//                     {!loading &&
//                         files.map((file) => (
//                             <div
//                                 key={file._id}
//                                 className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
//                             >

//                                 {/* LEFT: IMAGE + TEXT */}
//                                 <div className="flex items-center gap-4">

//                                     {/* IMAGE PREVIEW */}
//                                     {file.type === "image" && (
//                                         <img
//                                             src={file.url}
//                                             alt={file.title}
//                                             className="w-14 h-14 object-cover rounded-lg border"
//                                         />
//                                     )}

//                                     <div>
//                                         <h2 className="font-semibold text-gray-800">
//                                             {file.title}
//                                         </h2>

//                                         <p className="text-sm text-gray-500">
//                                             {file.type}
//                                         </p>
//                                     </div>

//                                 </div>

//                                 {/* DOWNLOAD */}
//                                 <a
//                                     href={file.url}
//                                     target="_blank"
//                                     className="text-indigo-500 text-xl"
//                                 >
//                                     ⬇
//                                 </a>

//                             </div>
//                         ))
//                     }

//                 </div>

//             </div>
//         </div>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type FileType = {
    _id: string;
    title: string;
    url: string;
    type: string;
};

export default function FilesPage() {
    const params = useParams();
    const subject = params?.subject as string | undefined;

    const [files, setFiles] = useState<FileType[]>([]);
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFiles() {
            try {
                setLoading(true);

                const res = await fetch(`/api/subjects/${subject}/files`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data?.error || "Failed to fetch files");
                }

                setSubjectName(data?.subjectName || "");
                setFiles(data?.files || []);
            } catch (err) {
                console.error("FETCH ERROR:", err);
                setSubjectName("");
                setFiles([]);
            } finally {
                setLoading(false);
            }
        }

        if (subject) fetchFiles();
    }, [subject]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Files for{" "}
                        <span className="text-indigo-600">
                            {subjectName || "Loading..."}
                        </span>
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Download lecture notes, assignments, and study materials.
                    </p>
                </div>

                {/* FILE LIST */}
                <div className="space-y-4">

                    {/* LOADING */}
                    {loading &&
                        Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-16 bg-white border border-gray-200 rounded-2xl animate-pulse"
                            />
                        ))}

                    {/* EMPTY STATE */}
                    {!loading && files.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm">
                            <div className="text-5xl mb-3">📭</div>

                            <h2 className="text-xl font-semibold text-gray-800">
                                No Files Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                There are currently no uploaded files for this subject.
                            </p>
                        </div>
                    )}

                    {/* FILES */}
                    {!loading &&
                        files.map((file) => (
                            <div
                                key={file._id}
                                className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                            >
                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-4">

                                    {/* IMAGE PREVIEW (Cloudinary safe) */}
                                    {file.type?.startsWith("image/") && (
                                        <img
                                            src={file.url}
                                            alt={file.title}
                                            className="w-14 h-14 object-cover rounded-lg border"
                                        />
                                    )}

                                    <div>
                                        <h2 className="font-semibold text-gray-800">
                                            {file.title}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {file.type}
                                        </p>
                                    </div>
                                </div>

                                {/* DOWNLOAD */}
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 text-xl hover:scale-110 transition"
                                >
                                    ⬇
                                </a>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}