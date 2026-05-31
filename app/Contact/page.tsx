"use client";

import { useState } from "react";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Message sent successfully ✅");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* HERO */}
            {/* HERO SECTION WITH BACKGROUND IMAGE */}
            <section
                className="relative py-28 px-6 text-center text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop')",
                }}
            >
                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Contact Us
                    </h1>

                    <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-8">
                        Have questions or need support? We are here to help you.
                        Send us a message and we will respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* MAIN SECTION */}
            {/* MAIN SECTION - MODERN SAAS STYLE */}
            <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">

                {/* decorative background blur blobs */}
                <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>

                <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    {/* LEFT INFO CARD */}
                    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[30px] p-10 shadow-xl">

                        <h2 className="text-3xl font-bold mb-6">
                            Get In Touch
                        </h2>

                        <p className="text-gray-600 mb-10 leading-7">
                            We usually respond within 24 hours. Feel free to reach out
                            for support, feedback, or any queries.
                        </p>

                        <div className="space-y-6">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                                    📧
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">support@eduportal.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
                                    📞
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">+92 300 1234567</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 text-xl">
                                    📍
                                </div>
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-gray-600">Faisalabad, Pakistan</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT FORM CARD */}
                    <div className="bg-white rounded-[30px] shadow-xl border p-10">

                        <h2 className="text-3xl font-bold mb-6">
                            Send Message
                        </h2>

                        <p className="text-gray-600 mb-8">
                            Fill this form and we’ll respond quickly.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200"
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200"
                            />

                            <textarea
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={6}
                                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                        </form>
                    </div>

                </div>
            </section>
            {/* CTA SECTION (MATCHES HOME/ABOUT STYLE) */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-14 text-center text-white">

                        <h2 className="text-4xl font-bold mb-6">
                            We’re Here to Help You Anytime
                        </h2>

                        <p className="text-blue-100 mb-10 max-w-3xl mx-auto">
                            EduPortal support team is always ready to assist students and faculty.
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