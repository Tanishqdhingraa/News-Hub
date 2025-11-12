const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, "News content is required"],
      maxlength: 300 * 5, // roughly 300 words (approx. 1500 chars)
    },
    photo: {
      type: String, // file path
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
