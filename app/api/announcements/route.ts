import { NextResponse } from "next/server";
import dbConnect from "./../../../lib/mongodb";
import Announcement from "@/models/Announcement";

// GET all announcements (student use)
export async function GET() {
    await dbConnect();
    const data = await Announcement.find().sort({ createdAt: -1 });
    return NextResponse.json(data);
}

// POST new announcement (faculty use)
export async function POST(req: Request) {
    await dbConnect();

    const body = await req.json();

    const newAnnouncement = await Announcement.create({
        title: body.title,
        message: body.message,
        priority: body.priority,
    });

    return NextResponse.json(newAnnouncement);
}