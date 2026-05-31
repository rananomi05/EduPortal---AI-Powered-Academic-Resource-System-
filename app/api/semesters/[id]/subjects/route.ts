import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Subject from "@/models/Subject";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongo();

    const { id } = await context.params; // ✅ FIX

    const subjects = await Subject.find({
      semesterId: id,
    }).sort({ name: 1 });

    return NextResponse.json(subjects);
    
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}