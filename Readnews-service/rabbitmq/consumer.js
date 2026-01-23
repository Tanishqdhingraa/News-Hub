import amqp from "amqplib";
import news from "../models/news.model.js";
import dotenv from 'dotenv'
dotenv.config()
const EXCHANGE = "NEWS_EXCHANGE";

export async function consumeNewsCreated() {
  try {
    const connection = await amqp.connect(process.env.rabbitmqconsumer);
    const channel = await connection.createChannel();

    console.log("🤞 Connected to RabbitMQ");

    await channel.assertExchange(EXCHANGE, "topic", { durable: true });

    const q = await channel.assertQueue("READ_NEWS_QUEUE", { durable: true });
    await channel.bindQueue(q.queue, EXCHANGE, "news.created");

    console.log("📥 Waiting for news.created events...\n");

    channel.consume(q.queue, async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());

        console.log("📨 Event received:", data);

        const savedNews = await news.create({
          postId: data.id,
          title: data.title,
          content: data.content,
          image: data.image,
          authorId: data.authorId,
          createdAt: data.createdAt
        });

        console.log("✅ News stored in Read DB:", savedNews._id, "\n");

        channel.ack(msg);
      } catch (err) {
        console.error("❌ Error processing message:", err.message);
        // don't ack → message can be retried if needed
      }
    });

    // 🔴 Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\n🛑 Closing RabbitMQ connection...");
      await channel.close();
      await connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error("❌ RabbitMQ Consumer Error:", error);
    process.exit(1);
  }
}
