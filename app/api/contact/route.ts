// app/api/contact/route.ts

import { NextResponse } from "next/server";
import mongoose, { Schema, model, models } from "mongoose";

// =======================
// MongoDB Connection
// =======================

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
    throw new Error("Please add MONGODB_URL in .env.local");
}

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGODB_URL);
}

// =======================
// Contact Schema
// =======================

const ContactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Contact =
    models.Contact || model("Contact", ContactSchema);

// =======================
// POST API
// =======================

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const { name, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                {
                    error: "All fields are required",
                },
                { status: 400 }
            );
        }

        // Save Data
        const newMessage = await Contact.create({
            name,
            email,
            message,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Message sent successfully",
                data: newMessage,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}