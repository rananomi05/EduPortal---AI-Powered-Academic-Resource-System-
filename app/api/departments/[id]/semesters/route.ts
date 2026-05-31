import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Semester from "@/models/Semester";
import Department from "@/models/Department"; // make sure you have this model
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongo();

    const { id } = await context.params; // `id` could be name or ObjectId

    let departmentId: string;

    // check if id is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      departmentId = id;
    } else {
      // try to find department by name
      const dept = await Department.findOne({ name: id });
      if (!dept) {
        return NextResponse.json(
          { error: "Department not found" },
          { status: 404 }
        );
      }
      departmentId = dept._id.toString();
    }

    const semesters = await Semester.find({
      departmentId,
    }).sort({ name: 1 });

    return NextResponse.json(semesters);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch semesters" },
      { status: 500 }
    );
  }
}