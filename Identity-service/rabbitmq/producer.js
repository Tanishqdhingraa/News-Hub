import amqp from "amqplib";

const EXCHANGE = "USER_EVENTS";
let channel;

// Connect once
export async function initRabbitMQ() {
  const connection = await amqp.connect("amqp://admin:admin123@localhost:5672");
  channel = await connection.createConfirmChannel();
  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  console.log("✅ RabbitMQ connected");
}

// Publish login event
export async function publishUserLogin(user) {
  if (!channel) {
    throw new Error("RabbitMQ not initialized");
  }

  const message = {
    userId: user.userId,   // ✅ FIX HERE
    email: user.email,
    name: user.name,
    event: "USER_LOGGED_IN"
  };

  return new Promise((resolve, reject) => {
    channel.publish(
      EXCHANGE,"user.login",Buffer.from(JSON.stringify(message)),{ persistent: true },
      (error) => {
        if (error) {
          return reject(error);
        }
        console.log("📤 Login event sent:", message);
        resolve();
      }
    );
  });
}

