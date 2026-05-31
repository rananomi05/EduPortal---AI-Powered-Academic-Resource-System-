"use client";

import { useState } from "react";

export default function AIPage() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            setReply(data.reply);
        } catch (error) {
            setReply("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white px-6 py-10 flex flex-col items-center">

            {/* HEADER */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
                EduPortal AI Assistant
            </h1>

            <p className="text-gray-400 text-center mb-10 max-w-2xl">
                Ask anything about lectures, assignments, coding, or academic resources.
            </p>

            {/* CHAT BOX */}
            <div className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl">

                {/* INPUT */}
                <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-cyan-400 resize-none text-white placeholder:text-gray-400"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask something like: Explain React hooks, or solve my assignment..."
                />

                {/* BUTTON */}
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-90 text-white py-3 rounded-2xl font-semibold transition disabled:opacity-50"
                >
                    {loading ? "Thinking..." : "Send Message"}
                </button>

                {/* RESPONSE */}
                {reply && (
                    <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-xs text-gray-400 mb-2">AI Response</p>
                        <p className="text-gray-200 leading-7 whitespace-pre-line">
                            {reply}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}