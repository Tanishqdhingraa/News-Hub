import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  photo: { type: String },
  createdAt: { type: Date }
}, { timestamps: true });

export default mongoose.model("ReadNews", newsSchema);
