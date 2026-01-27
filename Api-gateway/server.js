import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import expressProxy from "express-http-proxy";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔒 Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5 // 5 requests per IP
});

// 🛡 Security & Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

// Test route
app.get("/test", (req, res) => {
  res.send("👋 Hello API Gateway service!");
});

// 🔀 Proxy Routes
app.use("/user", expressProxy("http://localhost:3002"));
app.use("/postnews", expressProxy("http://localhost:3003"));
app.use("/Ainews", expressProxy("http://localhost:3004"));
app.use("/notifynews", expressProxy("http://localhost:3007"));
app.use("/readnews", expressProxy("http://localhost:3008"));


// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
});
