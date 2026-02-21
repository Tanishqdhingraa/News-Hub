const Post = require("../models/post");
const cloudinary = require("../config/cloudinary");
// const { Postednewsproducer } = require("../rabbitmq/producer");
const { publishNewsCreated } = require("../rabbitmq/producer");

// ✅ Create a new post
exports.createPost = async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ message: "Subject and content are required" });
    }

    const existingSubject = await Post.findOne({ subject });
    if (existingSubject) {
      return res.status(400).json({
        message: "Post not created because this subject already exists",
      });
    }

    // 🟢 CASE 1: With photo
    if (req.file) {
      cloudinary.uploader.upload_stream(
        { folder: "posts" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Cloudinary upload failed" });
          }

          const newPost = await Post.create({
            subject,
            content,
            photo: result.secure_url,
          });

          // 🔥 Publish event
          publishNewsCreated(newPost).catch(err =>
            console.error("RabbitMQ publish failed:", err)
          );

          return res.status(201).json({
            message: "Post created successfully",
            post: newPost,
          });
        }
      ).end(req.file.buffer);

      return;
    }

    // 🟢 CASE 2: Without photo
    const newPost = await Post.create({
      subject,
      content,
      photo: null,
    });

    // 🔥 Publish event
    publishNewsCreated(newPost).catch(err =>
      console.error("RabbitMQ publish failed:", err)
    );

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
};


// ✅ Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching posts",
      error: error.message,
    });
  }
};
