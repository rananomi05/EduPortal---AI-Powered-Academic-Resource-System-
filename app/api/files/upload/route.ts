import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import FileModel from "@/models/File";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await connectMongo();

    const formData = await req.formData();

    const file = formData.get("file");

    const title = String(formData.get("title") || "");
    const category = String(formData.get("category") || "");
    const subjectId = String(formData.get("subjectId") || "");
    const department = String(formData.get("department") || "");
    const semester = String(formData.get("semester") || "");
    const uploader = String(formData.get("uploader") || "");

    console.log("UPLOAD HIT ✔");

    // -----------------------------------
    // FILE VALIDATION
    // -----------------------------------
    if (!(file instanceof File)) {
      console.log("NO FILE RECEIVED ❌");

      return NextResponse.json(
        { error: "No valid file uploaded" },
        { status: 400 }
      );
    }

    console.log("FILE NAME:", file.name);
    console.log("FILE TYPE:", file.type);

    // -----------------------------------
    // OBJECT ID VALIDATION
    // -----------------------------------
    const isValidObjectId = (id: string) =>
      typeof id === "string" &&
      id.length > 0 &&
      mongoose.Types.ObjectId.isValid(id);

    console.log("RECEIVED IDS:", {
      subjectId,
      department,
      semester,
      uploader,
    });

    // uploader is TEMPORARILY OPTIONAL
    if (
      !isValidObjectId(subjectId) ||
      !isValidObjectId(department) ||
      !isValidObjectId(semester)
    ) {
      console.log("INVALID IDS ❌");

      return NextResponse.json(
        { error: "Missing or invalid IDs" },
        { status: 400 }
      );
    }

    // -----------------------------------
    // FILE BUFFER
    // -----------------------------------
    const buffer = Buffer.from(await file.arrayBuffer());

    console.log("UPLOADING TO CLOUDINARY...");

    // -----------------------------------
    // CLOUDINARY UPLOAD
    // -----------------------------------
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "eduportal/files",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("CLOUDINARY ERROR:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });

    console.log("UPLOAD SUCCESS ✔");
    console.log("CLOUDINARY URL:", uploadResult.secure_url);

    // -----------------------------------
    // DATABASE OBJECT
    // -----------------------------------
    const fileData: any = {
      title,
      category,
      subjectId,
      department,
      semester,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      type: file.type || "application/octet-stream",
    };

    // uploader optional for now
    if (isValidObjectId(uploader)) {
      fileData.uploader = uploader;
    }

    // -----------------------------------
    // SAVE TO MONGODB
    // -----------------------------------
    const newFile = await FileModel.create(fileData);

    console.log("FILE SAVED TO DATABASE ✔");

    return NextResponse.json(newFile);

  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}