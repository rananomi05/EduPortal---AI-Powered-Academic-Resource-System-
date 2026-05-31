export default function About() {
    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* HERO */}
            <section
                className="relative py-28 px-6 text-center text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop')",
                }}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        About EduPortal
                    </h1>

                    <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-8">
                        EduPortal is a modern academic platform designed to simplify
                        learning, improve collaboration, and provide easy access to
                        educational resources for students and faculty.
                    </p>
                </div>
            </section>

            {/* STATS */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                    {[
                        ["10K+", "Active Students"],
                        ["500+", "Study Resources"],
                        ["120+", "Faculty Members"],
                    ].map(([num, label], i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-3xl shadow-sm p-10 hover:shadow-xl transition"
                        >
                            <h2 className="text-4xl font-bold text-blue-600 mb-2">
                                {num}
                            </h2>
                            <p className="text-gray-600">{label}</p>
                        </div>
                    ))}

                </div>
            </section>

            {/* MISSION */}
            <section
                className="relative py-28 px-6 text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop')",
                }}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            Our Mission
                        </h2>

                        <p className="text-gray-200 text-lg leading-8 mb-6">
                            Our mission is to transform traditional education into a
                            smart digital ecosystem where students and teachers can
                            collaborate efficiently.
                        </p>

                        <p className="text-gray-300 leading-7">
                            We aim to centralize all academic resources in one secure
                            and easy-to-use platform.
                        </p>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-10">

                        <h3 className="text-2xl font-bold mb-6">
                            Why EduPortal?
                        </h3>

                        <ul className="space-y-4 text-gray-200">
                            <li>✔ Simple and clean UI</li>
                            <li>✔ Role-based access system</li>
                            <li>✔ Fast file management</li>
                            <li>✔ Secure authentication</li>
                            <li>✔ Scalable architecture</li>
                        </ul>

                    </div>

                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">

                    <h2 className="text-4xl font-bold text-center mb-14">
                        Key Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {[
                            {
                                title: "Smart Dashboard",
                                desc: "Personalized dashboards for all users.",
                            },
                            {
                                title: "Resource Management",
                                desc: "Upload and manage academic files easily.",
                            },
                            {
                                title: "Secure System",
                                desc: "Safe login using modern authentication.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl transition"
                            >
                                <h3 className="text-2xl font-semibold mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-14 text-center text-white shadow-2xl">

                        <h2 className="text-4xl font-bold mb-6">
                            Start Using EduPortal Today
                        </h2>

                        <p className="text-blue-100 mb-10 max-w-3xl mx-auto">
                            Join thousands of students and teachers already using EduPortal.
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