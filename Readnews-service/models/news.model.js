const mongoose = require("mongoose");

const readNewsSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true, // 🔥 fast lookup
    },

    subject: String,

    content: String,

    photo: String,

    createdAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: false } // createdAt comes from event
);

module.exports = mongoose.model("read_news", readNewsSchema);
