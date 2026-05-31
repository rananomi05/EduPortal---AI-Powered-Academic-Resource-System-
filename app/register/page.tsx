"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { data: session, status } = useSession();
    const router = useRouter();

    // ===== Redirect after login =====
    useEffect(() => {
        if (status === "authenticated") {
            const role = session?.user.role;

            if (role === "admin") router.push("/dashboard/admin");
            else if (role === "faculty")
                router.push("/dashboard/faculty");
            else router.push("/dashboard/student");
        }
    }, [status, session, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            // Automatically sign in after registration
            await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
        } else {
            alert(data.error);
        }
    };

    // Show loading/redirect message if already logged in
    if (session)
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white text-2xl font-semibold">
                Redirecting to your dashboard...
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] flex items-center justify-center px-4 py-10">

            {/* Main Card */}
            <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-[35px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-indigo-600 to-cyan-500 text-white relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h1 className="text-5xl font-extrabold leading-tight mb-6">
                            Join EduPortal Today
                        </h1>

                        <p className="text-lg text-blue-100 leading-8 mb-10">
                            Create your account and unlock access to educational
                            resources, smart dashboards, faculty collaboration,
                            and secure learning tools.
                        </p>

                        <div className="space-y-5">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                                    🎓
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Student Friendly
                                    </h3>

                                    <p className="text-blue-100 text-sm">
                                        Access study material anytime
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                                    📂
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Resource Management
                                    </h3>

                                    <p className="text-blue-100 text-sm">
                                        Organize files and subjects easily
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                                    🔒
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Secure Authentication
                                    </h3>

                                    <p className="text-blue-100 text-sm">
                                        Safe login system for all users
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="bg-white p-8 sm:p-12 lg:p-14">

                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">
                            Create Account
                        </h2>

                        <p className="text-gray-500 text-lg">
                            Register to continue to EduPortal
                        </p>
                    </div>

                    {/* Register Form */}
                    <form
                        onSubmit={handleRegister}
                        className="space-y-6"
                    >

                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Full Name
                            </label>

                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Enter your full name"
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Email Address
                            </label>

                            <input
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-lg font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-[1px] bg-gray-200"></div>

                        <span className="text-gray-400 text-sm">
                            OR CONTINUE WITH
                        </span>

                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="space-y-4">

                        <button
                            onClick={() => signIn("github")}
                            className="w-full py-4 rounded-2xl bg-gray-900 hover:bg-black text-white font-semibold transition duration-300"
                        >
                            Continue with GitHub
                        </button>

                        <button
                            onClick={() => signIn("google")}
                            className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-300"
                        >
                            Continue with Google
                        </button>
                    </div>

                    {/* Footer Text */}
                    <p className="text-center text-gray-500 mt-10">
                        Already have an account?{" "}
                        <span
                            onClick={() => router.push("/login")}
                            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                        >
                            Login Now
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}