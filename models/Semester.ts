import mongoose from "mongoose";

const SemesterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Semester 1"
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  },
  { timestamps: true }
);

const Semester = mongoose.models.Semester || mongoose.model("Semester", SemesterSchema);

export default Semester;