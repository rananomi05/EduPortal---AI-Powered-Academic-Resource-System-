import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Department from "@/models/Department";

export async function GET() {
  try {
    await connectMongo();
    const departments = await Department.find().sort({ name: 1 });

    return NextResponse.json(departments); // ✅ ARRAY
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}