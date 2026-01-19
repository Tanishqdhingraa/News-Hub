const Post = require("../models/post");
const cloudinary = require("../config/cloudinary");
// const { Postednewsproducer } = require("../rabbitmq/producer");

// ✅ Create a new post
exports.createPost = async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ message: "Subject and content are required" });
    }
    // ✅ check existing subject
    const existingSubject = await Post.findOne({ subject });
    if (existingSubject) {
      return res.status(400).json({
        message: "Post not created because this subject already exists",
      });
    }
      
    let photoUrl = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
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

          return res.status(201).json({
            message: "Post created successfully",
            post: newPost,
          });
        }
      );

      uploadResult.end(req.file.buffer);
      return;
    }

    const newPost = await Post.create({
      subject,
      content,
      photo: photoUrl,
    });
    // // sending to mail service 
    // Postednewsproducer({
    // subject: newPost.subject,
    // content: newPost.content
    // })


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
