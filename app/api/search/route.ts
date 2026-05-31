import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import File from "@/models/File";

export async function GET(req: Request) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);

        const q = searchParams.get("q") || "";

        const files = await File.find({
            title: {
                $regex: q,
                $options: "i",
            },
        });

        return NextResponse.json(files);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Search failed" },
            { status: 500 }
        );
    }
}