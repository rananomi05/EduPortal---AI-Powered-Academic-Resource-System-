export default function SettingsPage() {
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
                        Settings
                    </h1>
                    <p className="text-gray-200 text-lg">
                        Manage system configuration and preferences
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto px-6 py-16">

                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-xl transition">

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        System Settings
                    </h2>

                    <p className="text-gray-500 leading-7 mb-8">
                        System settings panel (you can extend later)
                    </p>

                    {/* UI blocks (future-ready layout) */}
                    <div className="space-y-6">

                        <div className="flex items-center justify-between p-4 border rounded-2xl">
                            <span className="text-gray-700">Dark Mode</span>
                            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm">
                                Enable
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-2xl">
                            <span className="text-gray-700">Email Notifications</span>
                            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm">
                                Enable
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-2xl">
                            <span className="text-gray-700">System Backup</span>
                            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm">
                                Run
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}