export default function Features() {
    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* HERO */}
            <section
                className="relative py-28 px-6 text-center text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop')",
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Powerful Features
                    </h1>

                    <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-8">
                        EduPortal provides everything needed to manage academic resources,
                        making learning simple, fast, and organized for students and faculty.
                    </p>
                </div>
            </section>

            {/* FEATURE GRID (SAME STYLE AS HOME CARDS) */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {[
                        {
                            title: "📂 File Management System",
                            desc: "Upload, organize and manage all educational PDFs, notes and assignments in one place.",
                        },
                        {
                            title: "👨‍🎓 Student Dashboard",
                            desc: "Students get a clean dashboard to access subjects, files and announcements easily.",
                        },
                        {
                            title: "👨‍🏫 Faculty Panel",
                            desc: "Teachers can upload and manage academic resources quickly and efficiently.",
                        },
                        {
                            title: "🔐 Secure Authentication",
                            desc: "Role-based login system using NextAuth ensures secure access for all users.",
                        },
                        {
                            title: "⚡ Fast Performance",
                            desc: "Optimized Next.js system for smooth, fast and modern user experience.",
                        },
                        {
                            title: "📱 Fully Responsive",
                            desc: "Works perfectly on mobile, tablet and desktop devices.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold mb-6">
                                {index + 1}
                            </div>

                            <h2 className="text-2xl font-semibold mb-3">
                                {item.title}
                            </h2>

                            <p className="text-gray-600 leading-7">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* MISSION SECTION */}
            {/* MISSION / WHY SECTION */}
            <section
                className="relative py-24 px-6 text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT TEXT */}
                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            Built for Modern Education
                        </h2>

                        <p className="text-gray-200 text-lg leading-8 mb-6">
                            EduPortal is not just a tool — it's a complete academic ecosystem
                            designed to improve learning and teaching experience.
                        </p>

                        <p className="text-gray-300 leading-7">
                            Everything is centralized: files, resources, dashboards, and user roles.
                        </p>
                    </div>

                    {/* RIGHT CARD (GLASS EFFECT) */}
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">

                        <h3 className="text-2xl font-bold mb-6">
                            Why Choose EduPortal?
                        </h3>

                        <ul className="space-y-4 text-gray-200">
                            <li>✔ Simple and clean UI</li>
                            <li>✔ Role-based system</li>
                            <li>✔ Fast file access</li>
                            <li>✔ Secure authentication</li>
                            <li>✔ Scalable architecture</li>
                        </ul>

                    </div>

                </div>
            </section>

            {/* CTA (SAME AS HOME PAGE) */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-14 text-center text-white shadow-2xl">

                        <h2 className="text-4xl font-bold mb-6">
                            Start Using EduPortal Features
                        </h2>

                        <p className="text-blue-100 mb-10 max-w-3xl mx-auto">
                            Join EduPortal and experience a smarter way to manage academic resources.
                        </p>

                        <a
                            href="/register"
                            className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"
                        >
                            Get Started
                        </a>

                    </div>
                </div>
            </section>

        </div>
    );
}