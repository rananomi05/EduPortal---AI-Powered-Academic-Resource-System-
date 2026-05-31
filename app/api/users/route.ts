import { NextResponse } from "next/server";
import User from "@/models/User"; // your mongoose model

export async function GET() {
    try {
        const users = await User.find({});
        return NextResponse.json(users);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}