import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["admin", "faculty", "student"], default: "student" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);