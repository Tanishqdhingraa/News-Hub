import amqp from "amqplib";

const EXCHANGE = "USER_EVENTS";

export async function publishUserLogin(user) {
  try {
    const connection = await amqp.connect("amqp://admin:admin123@localhost:5672")

    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, "topic", { durable: true });

    const message = {
      userId: user._id,
      email: user.email,
      name: user.name,
      event: "USER_LOGGED_IN"
    };

    channel.publish(
      EXCHANGE,
      "user.login",
      Buffer.from(JSON.stringify(message))
    );

    console.log("📤 Login event sent:", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (err) {
    console.error("RabbitMQ Error:", err);
  }
}
