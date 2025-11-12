const express = require("express");
const router = express.Router();

const { createPost, getAllPosts } = require("../controllers/postController");
const upload = require("../middleware/upload");

// 🧠 Route to create a post
router.post("/", upload.single("photo"), createPost);

// 🧠 Route to get all posts
router.get("/", getAllPosts);

module.exports = router;
