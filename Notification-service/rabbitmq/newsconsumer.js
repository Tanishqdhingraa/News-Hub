import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// const routingkey = 'postroutingkey'
//         const queue = 'postqueue'
//         const exchange = 'postexchange'


const exchange = "postexchange";
const routingkey = "postroutingkey";
const queue = "postqueue";

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dhingratanishq58@gmail.com",
    pass: process.env.password
  }
});

// ✉️ Send news notification mail
async function sendNewsMail(subject, content) {
  await transporter.sendMail({
    from: "News Hub <dhingratanishq58@gmail.com>",
    to: "subscriber@example.com", // later: dynamic users
    subject: `📰 New Post: ${subject}`,
    html: `
      <div style="font-family:Arial; line-height:1.6">
        <h2 style="color:#2563eb">📰 New Article Posted</h2>

        <h3>${subject}</h3>

        <p>${content}</p>

        <div style="margin-top:16px; padding:12px; background:#f1f5f9; border-radius:8px">
          <p>Stay updated with the latest news on <strong>News Hub</strong>.</p>
        </div>

        <p style="margin-top:20px">
          Regards,<br/>
          <strong>Team News Hub</strong> 💙
        </p>
      </div>
    `
  });

  console.log("📧 News email sent");
}

// 🐇 RabbitMQ Consumer
export async function startPostConsumer() {
  const connection = await amqp.connect("amqp://admin:admin123@localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingkey);

  channel.consume(queue, async (msg) => {
    const data = JSON.parse(msg.content.toString());

    await sendNewsMail(data.subject, data.content);

    channel.ack(msg);
  });

  console.log("📩 Post notification service running...");
}
