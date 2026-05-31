"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";


export default function Home() {
    const [current, setCurrent] = useState(0);

    const sliderRef = useRef<HTMLDivElement>(null);


    const slides = [
        {
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
            title: "Learn Smarter With Modern Resources",
            desc: "Access notes, PDFs, assignments, and educational resources in one place.",
        },
        {
            image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
            title: "Manage Files Easily",
            desc: "Upload, organize, and share academic materials with students and faculty.",
        },
        {
            image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
            title: "Build Your Academic Community",
            desc: "Connect students and teachers through a powerful learning platform.",
        },
    ];

    // ✅ Auto slide every 3 sec
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => {
                const next = (prev + 1) % slides.length;

                sliderRef.current?.scrollTo({
                    left: next * window.innerWidth,
                    behavior: "smooth",
                });

                return next;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    // ✅ Dot click
    const goToSlide = (index: number) => {
        setCurrent(index);

        sliderRef.current?.scrollTo({
            left: index * window.innerWidth,
            behavior: "smooth",
        });
    };


    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* HERO SLIDER */}
            <section className="w-full overflow-hidden relative">

                {/* SLIDER */}
                <div
                    ref={sliderRef}
                    className="flex overflow-x-hidden scroll-smooth"
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-full h-[85vh] relative"
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
                                <div className="max-w-3xl text-center text-white">

                                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                        {slide.title}
                                    </h1>

                                    <p className="text-lg md:text-xl text-gray-200 mb-8 leading-8">
                                        {slide.desc}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                                        <Link
                                            href="/register"
                                            className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl text-lg font-semibold transition duration-300"
                                        >
                                            Get Started
                                        </Link>

                                        <Link
                                            href="#features"
                                            className="border border-white hover:bg-white hover:text-black px-7 py-3 rounded-xl text-lg font-semibold transition duration-300"
                                        >
                                            Explore Features
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DOTS */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index
                                    ? "bg-white scale-125"
                                    : "bg-white/40 hover:bg-white/70"
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* STATS */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

                    {[
                        ["10K+", "Students Registered"],
                        ["500+", "Educational Resources"],
                        ["120+", "Teachers Connected"],
                        ["24/7", "Platform Support"],
                    ].map(([number, label], index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition"
                        >
                            <h2 className="text-4xl font-bold text-blue-600 mb-3">
                                {number}
                            </h2>
                            <p className="text-gray-600 text-lg">{label}</p>
                        </div>
                    ))}

                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="py-24">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-5">
                            Powerful Features
                        </h2>

                        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                            Everything you need to manage academic resources in one place.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {[
                            {
                                title: "Upload & Manage Files",
                                desc: "Upload PDFs, notes, assignments easily.",
                            },
                            {
                                title: "Student Dashboard",
                                desc: "Access all subjects and materials.",
                            },
                            {
                                title: "Faculty Panel",
                                desc: "Teachers manage and upload resources.",
                            },
                            {
                                title: "Responsive Design",
                                desc: "Works on mobile, tablet, and desktop.",
                            },
                            {
                                title: "Fast Search System",
                                desc: "Find resources instantly.",
                            },
                            {
                                title: "Secure Authentication",
                                desc: "Safe login system with roles.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl transition"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold mb-6">
                                    {index + 1}
                                </div>

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

            {/* ABOUT */}
            <section id="about" className="py-24 bg-blue-50">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                    <img
                        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop"
                        className="rounded-3xl shadow-2xl"
                        alt="about"
                    />

                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            About EduPortal
                        </h2>

                        <p className="text-gray-700 text-lg leading-8 mb-6">
                            EduPortal simplifies learning by centralizing academic resources.
                            Students and teachers can share and manage files easily.
                        </p>

                        <p className="text-gray-700 text-lg leading-8 mb-8">
                            Built with modern web technologies for speed, security, and scalability.
                        </p>

                        <Link
                            href="/register"
                            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
                        >
                            Register Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-14 text-center text-white">

                        <h2 className="text-4xl font-bold mb-6">
                            Start Your Learning Journey Today
                        </h2>

                        <p className="text-blue-100 mb-10 max-w-3xl mx-auto">
                            Join EduPortal and manage academic resources efficiently.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-5">

                            <Link
                                href="/register"
                                className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold"
                            >
                                Create Account
                            </Link>

                            <Link
                                href="#features"
                                className="border border-white px-8 py-4 rounded-2xl font-semibold"
                            >
                                Learn More
                            </Link>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}