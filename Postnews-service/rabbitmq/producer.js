import amqp from "amqplib";

const EXCHANGE = "NEWS_EVENTS";

export async function publishNewsCreated(news) {
  const connection = await amqp.connect("amqp://admin:admin123@localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE, "topic", { durable: true });

  const payload = {
    id: news._id,
    title: news.title,
    content: news.content,
    image: news.image || null,
    authorId: news.authorId,
    createdAt: news.createdAt
  };

  channel.publish(
    EXCHANGE,
    "news.created",
    Buffer.from(JSON.stringify(payload))
  );

  console.log("📰 NEWS_CREATED event sent");

  setTimeout(() => connection.close(), 500);
}
