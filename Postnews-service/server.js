require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const postRoutes = require("./routes/postroutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
connectDB();

// Routes
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Post Service running on port ${PORT}`));
