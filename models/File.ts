import mongoose, { Schema, models, model } from "mongoose";

const FileSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    category: {
      type: String,
      default: "Lecture Notes",
    },

    type: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ ONLY ONE EXPORT (IMPORTANT)
const FileModel = models.File || model("File", FileSchema);

export default FileModel;