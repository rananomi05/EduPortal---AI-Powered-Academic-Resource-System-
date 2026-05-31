import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
    {
        title: String,
        message: String,
        priority: {
            type: String,
            enum: ["Normal", "Important", "Urgent"],
            default: "Normal",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Announcement ||
    mongoose.model("Announcement", AnnouncementSchema);