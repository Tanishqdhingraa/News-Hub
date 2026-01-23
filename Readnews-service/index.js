import express from "express";
import { consumeNewsCreated } from "./rabbitmq/consumer.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = 3008;

async function startServer() {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("✅ MongoDB connected (ReadNews)");

    // 🔥 Start RabbitMQ consumer AFTER DB is ready
    await consumeNewsCreated();

    app.get("/", (req, res) => {
      res.send("👋 Hello Read News service!");
    });

    app.listen(port, () => {
      console.log(`✅ Read news service listening on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("❌ Startup error:", error);
  }
}

startServer();
