import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import File from "@/models/File";

export async function GET() {
  try {
    await connectMongo();

    const files = await File.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}