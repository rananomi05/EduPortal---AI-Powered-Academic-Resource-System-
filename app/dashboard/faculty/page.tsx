// "use client";

// import { useEffect, useState } from "react";

// type Department = { _id: string; name: string };
// type Semester = { _id: string; name: string };
// type Subject = { _id: string; name: string };

// type UploadedFile = {
//     _id: string;
//     title: string;
//     category: string;
//     subject: string;
//     date: string;
//     status: "pending" | "approved" | "rejected";
//     size: string;
// };

// type Announcement = {
//     _id: string;
//     title: string;
//     message: string;
//     priority: "Normal" | "Important" | "Urgent";
//     date: string;
// };

// type Tab = "upload" | "announcements";

// const tabs: { key: Tab; label: string; emoji: string }[] = [
//     { key: "upload", label: "Upload Material", emoji: "📁" },
//     { key: "announcements", label: "Announcements", emoji: "📢" },
// ];

// const inputCls =
//     "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition";

// const labelCls =
//     "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1";

// const priorityBadge: Record<string, string> = {
//     Normal: "bg-gray-100 text-gray-600",
//     Important: "bg-yellow-100 text-yellow-700",
//     Urgent: "bg-red-100 text-red-600",
// };

// export default function FacultyPage() {
//     const [activeTab, setActiveTab] = useState<Tab>("upload");

//     const [departments, setDepartments] = useState<Department[]>([]);
//     const [semesters, setSemesters] = useState<Semester[]>([]);
//     const [subjects, setSubjects] = useState<Subject[]>([]);

//     const [selectedDept, setSelectedDept] = useState("");
//     const [selectedSem, setSelectedSem] = useState("");
//     const [selectedSub, setSelectedSub] = useState("");

//     const [title, setTitle] = useState("");
//     const [file, setFile] = useState<File | null>(null);
//     const [category, setCategory] = useState("Lecture Notes");

//     const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//     const [uploadLoading, setUploadLoading] = useState(false);

//     const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//     const [annTitle, setAnnTitle] = useState("");
//     const [annMessage, setAnnMessage] = useState("");
//     const [annPriority, setAnnPriority] =
//         useState<"Normal" | "Important" | "Urgent">("Normal");

//     useEffect(() => {
//         fetch("/api/departments")
//             .then((r) => r.json())
//             .then(setDepartments)
//             .catch(() => setDepartments([]));
//     }, []);

//     useEffect(() => {
//         if (!selectedDept) return;
//         fetch(`/api/departments/${selectedDept}/semesters`)
//             .then((r) => r.json())
//             .then(setSemesters)
//             .catch(() => setSemesters([]));
//     }, [selectedDept]);

//     useEffect(() => {
//         if (!selectedSem) return;
//         fetch(`/api/semesters/${selectedSem}/subjects`)
//             .then((r) => r.json())
//             .then(setSubjects)
//             .catch(() => setSubjects([]));
//     }, [selectedSem]);

//     const handleUpload = async () => {
//         if (!file || !title || !selectedDept || !selectedSem || !selectedSub) {
//             alert("Please fill all fields");
//             return;
//         }

//         try {
//             setUploadLoading(true);

//             const formData = new FormData();
//             formData.append("file", file);
//             formData.append("title", title);
//             formData.append("category", category);
//             formData.append("subjectId", selectedSub);
//             formData.append("department", selectedDept);
//             formData.append("semester", selectedSem);

//             const res = await fetch("/api/files/upload", {
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await res.json();

//             if (res.ok) {
//                 setUploadedFiles((prev) => [
//                     {
//                         _id: Date.now().toString(),
//                         title,
//                         category,
//                         subject:
//                             subjects.find((s) => s._id === selectedSub)?.name ||
//                             "",
//                         date: "Just now",
//                         status: "pending",
//                         size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
//                     },
//                     ...prev,
//                 ]);

//                 setTitle("");
//                 setFile(null);
//                 setSelectedDept("");
//                 setSelectedSem("");
//                 setSelectedSub("");
//             } else {
//                 alert(data.error || "Upload failed");
//             }
//         } finally {
//             setUploadLoading(false);
//         }
//     };

//     const handlePostAnnouncement = async () => {
//         if (!annTitle || !annMessage) return;

//         const res = await fetch("/api/announcements", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 title: annTitle,
//                 message: annMessage,
//                 priority: annPriority,
//             }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//             setAnnouncements((prev) => [data, ...prev]);
//             setAnnTitle("");
//             setAnnMessage("");
//             setAnnPriority("Normal");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 font-sans">

//             {/* HEADER */}
//             <div className="bg-gray-900 text-white px-6 py-5">
//                 <h1 className="text-xl font-bold">🎓 Faculty Portal</h1>

//                 <div className="flex gap-2 mt-3">
//                     {tabs.map((t) => (
//                         <button
//                             key={t.key}
//                             onClick={() => setActiveTab(t.key)}
//                             className={`px-4 py-2 rounded-lg text-sm transition font-medium
//                                 ${activeTab === t.key
//                                     ? "bg-amber-200 text-gray-900"
//                                     : "bg-white/10 text-white hover:bg-white/20"
//                                 }`}
//                         >
//                             {t.emoji} {t.label}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <div className="p-6 max-w-6xl mx-auto">

//                 {/* UPLOAD */}
//                 {activeTab === "upload" && (
//                     <div className="bg-white p-6 rounded-2xl border shadow-sm">

//                         <h2 className="text-lg font-bold text-gray-800 mb-5">
//                             Upload Resource
//                         </h2>

//                         <div className="grid grid-cols-2 gap-4">

//                             <div>
//                                 <label className={labelCls}>Department</label>
//                                 <select className={inputCls}
//                                     value={selectedDept}
//                                     onChange={(e) => setSelectedDept(e.target.value)}>
//                                     <option value="">Select</option>
//                                     {departments.map((d) => (
//                                         <option key={d._id} value={d._id}>{d.name}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className={labelCls}>Semester</label>
//                                 <select className={inputCls}
//                                     value={selectedSem}
//                                     onChange={(e) => setSelectedSem(e.target.value)}>
//                                     <option value="">Select</option>
//                                     {semesters.map((s) => (
//                                         <option key={s._id} value={s._id}>{s.name}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className={labelCls}>Subject</label>
//                                 <select className={inputCls}
//                                     value={selectedSub}
//                                     onChange={(e) => setSelectedSub(e.target.value)}>
//                                     <option value="">Select</option>
//                                     {subjects.map((s) => (
//                                         <option key={s._id} value={s._id}>{s.name}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className={labelCls}>Category</label>
//                                 <select className={inputCls}
//                                     value={category}
//                                     onChange={(e) => setCategory(e.target.value)}>
//                                     <option>Lecture Notes</option>
//                                     <option>Past Paper</option>
//                                     <option>Assignment</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <input
//                             className="mt-4 w-full border border-gray-200 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-amber-200"
//                             placeholder="Enter title..."
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                         />

//                         {/* 🔥 UPLOAD BOX (IMPROVED) */}
//                         <div
//                             className="mt-4 border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
//                             onClick={() => document.getElementById("file")?.click()}
//                         >
//                             <input
//                                 id="file"
//                                 type="file"
//                                 className="hidden"
//                                 onChange={(e) => setFile(e.target.files?.[0] || null)}
//                             />

//                             <div className="text-4xl mb-2">📤</div>

//                             <p className="text-gray-700 font-medium">
//                                 {file ? file.name : "Drop file here or click to upload"}
//                             </p>

//                             <p className="text-xs text-gray-400 mt-1">
//                                 PDF / Image supported
//                             </p>
//                         </div>

//                         <button
//                             onClick={handleUpload}
//                             disabled={uploadLoading}
//                             className="mt-5 bg-gray-900 text-amber-200 px-5 py-2 rounded-xl font-semibold hover:bg-gray-700 transition"
//                         >
//                             {uploadLoading ? "Uploading..." : "Upload"}
//                         </button>
//                     </div>
//                 )}

//                 {/* ANNOUNCEMENTS */}
//                 {activeTab === "announcements" && (
//                     <div className="space-y-6 font-sans">

//                         {/* CREATE ANNOUNCEMENT */}
//                         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

//                             <h2 className="font-bold text-gray-800 mb-4 text-lg">
//                                 New Announcement
//                             </h2>

//                             <input
//                                 className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-200 focus:border-amber-300 p-3 rounded-xl mb-3 text-gray-800 text-sm transition"
//                                 placeholder="Title"
//                                 value={annTitle}
//                                 onChange={(e) => setAnnTitle(e.target.value)}
//                             />

//                             <textarea
//                                 className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-200 focus:border-amber-300 p-3 rounded-xl mb-3 text-gray-800 text-sm transition"
//                                 placeholder="Message"
//                                 value={annMessage}
//                                 onChange={(e) => setAnnMessage(e.target.value)}
//                             />

//                             <button
//                                 onClick={handlePostAnnouncement}
//                                 className="bg-gray-900 text-amber-200 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
//                             >
//                                 📢 Post Announcement
//                             </button>
//                         </div>

//                         {/* LIST */}
//                         <div className="space-y-3">
//                             {announcements.map((a) => (
//                                 <div
//                                     key={a._id}
//                                     className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
//                                 >
//                                     <div className="flex justify-between items-center">
//                                         <h3 className="font-semibold text-gray-900 text-base">
//                                             {a.title}
//                                         </h3>

//                                         <span
//                                             className={`text-xs px-3 py-1 rounded-full font-medium ${priorityBadge[a.priority]}`}
//                                         >
//                                             {a.priority}
//                                         </span>
//                                     </div>

//                                     <p className="text-sm text-gray-600 mt-2 leading-relaxed">
//                                         {a.message}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


"use client";

import { useEffect, useState } from "react";

type Department = { _id: string; name: string };
type Semester = { _id: string; name: string };
type Subject = { _id: string; name: string };

type UploadedFile = {
    _id: string;
    title: string;
    category: string;
    subject: string;
    date: string;
    status: "pending" | "approved" | "rejected";
    size: string;
    url?: string;
    type?: string;
};

type Announcement = {
    _id: string;
    title: string;
    message: string;
    priority: "Normal" | "Important" | "Urgent";
    date: string;
};

type Tab = "upload" | "announcements";

const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "upload", label: "Upload Material", emoji: "📁" },
    { key: "announcements", label: "Announcements", emoji: "📢" },
];

const inputCls =
    "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition";

const labelCls =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1";

const priorityBadge: Record<string, string> = {
    Normal: "bg-gray-100 text-gray-600",
    Important: "bg-yellow-100 text-yellow-700",
    Urgent: "bg-red-100 text-red-600",
};

export default function FacultyPage() {
    const [activeTab, setActiveTab] = useState<Tab>("upload");

    const [departments, setDepartments] = useState<Department[]>([]);
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [selectedDept, setSelectedDept] = useState("");
    const [selectedSem, setSelectedSem] = useState("");
    const [selectedSub, setSelectedSub] = useState("");

    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState("Lecture Notes");

    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploadLoading, setUploadLoading] = useState(false);

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [annTitle, setAnnTitle] = useState("");
    const [annMessage, setAnnMessage] = useState("");
    const [annPriority, setAnnPriority] =
        useState<"Normal" | "Important" | "Urgent">("Normal");

    useEffect(() => {
        fetch("/api/departments")
            .then((r) => r.json())
            .then(setDepartments)
            .catch(() => setDepartments([]));
    }, []);

    useEffect(() => {
        if (!selectedDept) return;
        fetch(`/api/departments/${selectedDept}/semesters`)
            .then((r) => r.json())
            .then(setSemesters)
            .catch(() => setSemesters([]));
    }, [selectedDept]);

    useEffect(() => {
        if (!selectedSem) return;
        fetch(`/api/semesters/${selectedSem}/subjects`)
            .then((r) => r.json())
            .then(setSubjects)
            .catch(() => setSubjects([]));
    }, [selectedSem]);

    const handleUpload = async () => {
        if (!file || !title || !selectedDept || !selectedSem || !selectedSub) {
            alert("Please fill all fields");
            return;
        }

        try {
            setUploadLoading(true);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("category", category);
            formData.append("subjectId", selectedSub);
            formData.append("department", selectedDept);
            formData.append("semester", selectedSem);

            const res = await fetch("/api/files/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Upload failed");
                return;
            }

            // ✅ REAL BACKEND RESPONSE (Cloudinary)
            setUploadedFiles((prev) => [
                {
                    _id: data._id,
                    title: data.title,
                    category: data.category,
                    subject:
                        subjects.find((s) => s._id === selectedSub)?.name ||
                        "",
                    date: new Date().toLocaleString(),
                    status: "pending",
                    size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                    url: data.url,
                    type: data.type,
                },
                ...prev,
            ]);

            setTitle("");
            setFile(null);
            setSelectedDept("");
            setSelectedSem("");
            setSelectedSub("");
        } finally {
            setUploadLoading(false);
        }
    };

    const handlePostAnnouncement = async () => {
        if (!annTitle || !annMessage) return;

        const res = await fetch("/api/announcements", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: annTitle,
                message: annMessage,
                priority: annPriority,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setAnnouncements((prev) => [data, ...prev]);
            setAnnTitle("");
            setAnnMessage("");
            setAnnPriority("Normal");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* HEADER */}
            <div className="bg-gray-900 text-white px-6 py-5">
                <h1 className="text-xl font-bold">🎓 Faculty Portal</h1>

                <div className="flex gap-2 mt-3">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`px-4 py-2 rounded-lg text-sm transition font-medium
                                ${activeTab === t.key
                                    ? "bg-amber-200 text-gray-900"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            {t.emoji} {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 max-w-6xl mx-auto">

                {/* UPLOAD */}
                {activeTab === "upload" && (
                    <div className="bg-white p-6 rounded-2xl border shadow-sm">

                        <h2 className="text-lg font-bold text-gray-800 mb-5">
                            Upload Resource
                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className={labelCls}>Department</label>
                                <select className={inputCls}
                                    value={selectedDept}
                                    onChange={(e) => setSelectedDept(e.target.value)}>
                                    <option value="">Select</option>
                                    {departments.map((d) => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelCls}>Semester</label>
                                <select className={inputCls}
                                    value={selectedSem}
                                    onChange={(e) => setSelectedSem(e.target.value)}>
                                    <option value="">Select</option>
                                    {semesters.map((s) => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelCls}>Subject</label>
                                <select className={inputCls}
                                    value={selectedSub}
                                    onChange={(e) => setSelectedSub(e.target.value)}>
                                    <option value="">Select</option>
                                    {subjects.map((s) => (
                                        <option key={s._id} value={s._id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelCls}>Category</label>
                                <select className={inputCls}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option>Lecture Notes</option>
                                    <option>Past Paper</option>
                                    <option>Assignment</option>
                                </select>
                            </div>
                        </div>

                        <input
                            className="mt-4 w-full border border-gray-200 rounded-xl text-black px-3 py-2 bg-white"
                            placeholder="Enter title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* FILE UPLOAD */}
                        <div
                            className="mt-4 border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 cursor-pointer"
                            onClick={() => document.getElementById("file")?.click()}
                        >
                            <input
                                id="file"
                                type="file"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />

                            <div className="text-4xl mb-2">📤</div>

                            <p className="text-gray-700 font-medium">
                                {file ? file.name : "Drop file or click to upload"}
                            </p>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={uploadLoading}
                            className="mt-5 bg-gray-900 text-amber-200 px-5 py-2 rounded-xl font-semibold"
                        >
                            {uploadLoading ? "Uploading..." : "Upload"}
                        </button>

                        {/* UPLOADED FILES PREVIEW */}
                        <div className="mt-6 space-y-3">
                            {uploadedFiles.map((f) => (
                                <div key={f._id} className="flex justify-between bg-gray-100 p-3 rounded-xl">
                                    <div>
                                        <p className="font-semibold">{f.title}</p>

                                        {f.type?.startsWith("image/") && (
                                            <img src={f.url} className="w-16 h-16 mt-2 rounded" />
                                        )}
                                    </div>

                                    <a href={f.url} target="_blank" className="text-blue-600">
                                        Open
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ANNOUNCEMENTS */}
                {activeTab === "announcements" && (
                    <div>
                        <h1 className="text-black text-center font-bold  text-[30px] mb-7 "> ANNOUNCEMENTS </h1>
                        <input
                            value={annTitle}
                            onChange={(e) => setAnnTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-3 border text-black h-[60px] rounded-xl mb-2"
                        />

                        <textarea
                            value={annMessage}
                            onChange={(e) => setAnnMessage(e.target.value)}
                            placeholder="Message"
                            className="w-full p-3 border h-[100px] text-black rounded-xl mb-2"
                        />

                        <button
                            onClick={handlePostAnnouncement}
                            className="bg-black text-white px-4 py-2 rounded-xl"
                        >
                            Post
                        </button>

                        <div className="mt-5 space-y-3">
                            {announcements.map((a) => (
                                <div key={a._id} className="bg-white p-4 rounded-xl border">
                                    <h3 className="font-bold">{a.title}</h3>
                                    <p>{a.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}