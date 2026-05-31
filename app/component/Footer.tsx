export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-gray-300 border-t border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* BRAND */}
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                        EduPortal
                    </h2>

                    <p className="text-gray-400 leading-7">
                        A modern academic resource management system designed for
                        students and faculty to simplify learning, collaboration,
                        and file management.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-3">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/features" className="hover:text-white transition">Features</a></li>
                        <li><a href="/about" className="hover:text-white transition">About</a></li>
                        <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* RESOURCES */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Resources
                    </h3>

                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white transition">Study Materials</a></li>
                        <li><a href="#" className="hover:text-white transition">Past Papers</a></li>
                        <li><a href="#" className="hover:text-white transition">Assignments</a></li>
                        <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Contact
                    </h3>

                    <ul className="space-y-3 text-gray-400">
                        <li>📧 support@eduportal.com</li>
                        <li>📞 +92 300 1234567</li>
                        <li>📍 Faisalabad, Pakistan</li>
                    </ul>
                </div>

            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} EduPortal. All rights reserved.
            </div>

        </footer>
    );
}