// ✅ Load .env file (environment variables)
require("dotenv").config();

// ✅ Import dependencies
const express = require("express");
const cors = require("cors");
const Redis = require("ioredis");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const logger = require("./utils/logger");
const proxy = require("express-http-proxy");
// const errorHandler = require("./middleware/errorhandler");
// const { validateToken } = require("./middleware/authMiddleware");

// ✅ Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect Redis
const redisClient = new Redis(process.env.REDIS_URL);


// 🛡️ SECURITY & BASIC MIDDLEWARE

app.use(helmet()); // Secure headers
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON data


// 🚦 RATE LIMITING (prevent DDoS)

const ratelimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true, // Include info in headers
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ success: false, message: "Too many requests" });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args), // Use Redis for storing rate limit data
  }),
});
app.use(ratelimitOptions); // Apply globally


// 🧾 LOGGING REQUESTS
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  next();
});


// 🔄 COMMON PROXY OPTIONS

const proxyOptions = {
  proxyReqPathResolver: (req) => req.originalUrl.replace(/^\/v1/, "/api"), // Rewrite path
  proxyErrorHandler: (err, res, next) => {
    logger.error(`Proxy error: ${err.message}`);
    res.status(500).json({ message: "Internal server error", error: err.message });
  },
};


// 🧩 MICROSERVICE ROUTES


// 🔹 Identity Service (Auth)
if (process.env.IDENTITY_SERVICE_URL) {
  app.use(
    "/v1/auth",
    proxy(process.env.IDENTITY_SERVICE_URL, {
      ...proxyOptions,
      proxyReqOptDecorator: (opts) => {
        opts.headers["Content-Type"] = "application/json";
        return opts;
      },
      userResDecorator: (proxyRes, data) => {
        logger.info(`Response from Identity service: ${proxyRes.statusCode}`);
        return data;
      },
    })
  );
}

// // 🔹 Post Service (requires login)
// if (process.env.POST_SERVICE_URL) {
//   app.use(
//     "/v1/posts",
//     validateToken, // Verify JWT before request
//     proxy(process.env.POST_SERVICE_URL, {
//       ...proxyOptions,
//       proxyReqOptDecorator: (opts, req) => {
//         opts.headers["Content-Type"] = "application/json";
//         opts.headers["x-user-id"] = req.user.userId; // Send user ID to Post service
//         return opts;
//       },
//       userResDecorator: (proxyRes, data) => {
//         logger.info(`Response from Post service: ${proxyRes.statusCode}`);
//         return data;
//       },
//     })
//   );
// }

// 🔹 Media Service (for file uploads)
// if (process.env.MEDIA_SERVICE_URL) {
//   app.use(
//     "/v1/media",
//     validateToken, // Auth required
//     proxy(process.env.MEDIA_SERVICE_URL, {
//       ...proxyOptions,
//       proxyReqOptDecorator: (opts, req) => {
//         opts.headers["x-user-id"] = req.user.userId;
//         if (!req.headers["content-type"].startsWith("multipart/form-data")) {
//           opts.headers["Content-Type"] = "application/json";
//         }
//         return opts;
//       },
//       userResDecorator: (proxyRes, data) => {
//         logger.info(`Response from Media service: ${proxyRes.statusCode}`);
//         return data;
//       },
//       parseReqBody: false, // Disable body parsing for file uploads
//     })
//   );
// }

// 🔹 Search Service
// if (process.env.SEARCH_SERVICE_URL) {
//   app.use(
//     "/v1/search",
//     validateToken,
//     proxy(process.env.SEARCH_SERVICE_URL, {
//       ...proxyOptions,
//       proxyReqOptDecorator: (opts, req) => {
//         opts.headers["Content-Type"] = "application/json";
//         opts.headers["x-user-id"] = req.user.userId;
//         return opts;
//       },
//       userResDecorator: (proxyRes, data) => {
//         logger.info(`Response from Search service: ${proxyRes.statusCode}`);
//         return data;
//       },
//     })
//   );
// }





// 🚀 START SERVER

app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
  
});