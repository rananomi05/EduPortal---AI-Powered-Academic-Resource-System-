import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // e.g., "Data Structures"
    semesterId: { type: mongoose.Schema.Types.ObjectId, ref: "Semester", required: true },
  },
  { timestamps: true }
);

const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

export default Subject;