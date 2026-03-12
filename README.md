# 📰 NewsHub

NewsHub is a **microservices-based news platform** where users can **post news, read news, receive notifications, and interact with AI**.  
The backend is built using **Node.js, Express, MongoDB, RabbitMQ**, and follows a **microservices architecture**.

---

## 🚀 Features

- 🔐 **User Authentication**
- 📝 **Post News with Image**
- 📖 **Read News Feed**
- 🤖 **AI Assistant for News Queries**
- 🔔 **Email Notifications on Login**
- ⚡ **Event-driven communication using RabbitMQ**
- 🌐 **API Gateway for routing requests**
- 💬 **Chatbot assistant on frontend**

---

## 🏗 Architecture

The project follows **microservices architecture** with the following services:

| Service | Purpose |
|------|------|
| Identity Service | Authentication & authorization |
| Post News Service | Create and manage news posts |
| Read News Service | Read optimized news feed |
| Notification Service | Email notifications |
| AI Service | AI powered responses |
| API Gateway | Central request routing |

Communication between services happens through **RabbitMQ events**.

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB
- RabbitMQ
- Nodemailer
- JWT Authentication

**Frontend**
- React
- Tailwind CSS
- React Router

---

## 📂 Project Structure

```
NewsHub
│
├── api-gateway
├── identity-service
├── postnews-service
├── readnews-service
├── notification-service
├── ai-service
└── frontend
```

---

## ⚙️ Installation

```bash
git clone https://github.com/yourusername/newshub.git
cd newshub
```

Install dependencies inside each service:

```bash
npm install
```

Start services:

```bash
npm run dev
```

---

## 📨 Environment Variables Example

```
PORT=
MONGO_URI=
JWT_SECRET=
RABBITMQ_URL=
EMAIL_USER=
EMAIL_PASS=
```

---

## 🎯 Future Improvements

- Real-time notifications (Socket.IO)
- News category filtering
- AI summarization for news
- Trending news section

---

## 👨‍💻 Author

Built by **Tanishq Dhingra**  
B.Tech (2023–2027)
