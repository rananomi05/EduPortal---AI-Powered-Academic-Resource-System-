import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import File from "@/models/File";
import Subject from "@/models/Subject";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectMongo();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid subject ID" },
      { status: 400 }
    );
  }

  const subject = await Subject.findById(id);

  if (!subject) {
    return NextResponse.json(
      { error: "Subject not found" },
      { status: 404 }
    );
  }

  const files = await File.find({ subjectId: id }).sort({
    createdAt: -1,
  });

  return NextResponse.json({
    subjectName: subject.name,
    files,
  });
}