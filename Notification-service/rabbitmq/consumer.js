import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";



const EXCHANGE = "USER_EVENTS";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dhingratanishq58@gmail.com",
    pass: process.env.password // Gmail App Password
  }
});

async function sendWelcomeMail(email, name) {
  await transporter.sendMail({
    from: "News Hub <dhingratanishq58@gmail.com>",
    to: email,
    subject: "Welcome to News Hub 📰",
    html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color:#2563eb;">Hello News_enthusiast👋</h2>

    <p>
      Welcome to <strong>News Hub</strong> 📰
    </p>

    <p>
      We're excited to have you back! You’ve successfully logged in to your account.
    </p>

    <div style="background:#f1f5f9; padding:12px; border-radius:8px; margin:16px 0;">
      <p style="margin:0;">
        🚀 Stay updated with the latest news, trending stories, and insights curated just for you.
      </p>
    </div>

    <p>
      If this wasn’t you, please secure your account immediately.
    </p>

    <p style="margin-top:20px;">
      Happy reading,<br/>
      <strong>Team News Hub</strong> 💙
    </p>
  </div>
`

  });

  console.log("📧 Welcome email sent to", email);
}

export async function startConsumer() {
  
  const connection = await amqp.connect("amqp://admin:admin123@localhost:5672")
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  const q = await channel.assertQueue("NOTIFICATION_QUEUE");
  await channel.bindQueue(q.queue, EXCHANGE, "user.login");

  
  channel.consume(q.queue, async (msg) => {
    const data = JSON.parse(msg.content.toString());

    if (data.event === "USER_LOGGED_IN") {
      await sendWelcomeMail(data.email, data.name);
    }

    channel.ack(msg);
  });

  console.log("📩 Notification Service listening...");
}

