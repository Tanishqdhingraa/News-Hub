
require("dotenv").config();


const express = require("express");
const cors = require("cors");
// const Redis = require("ioredis");

const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");


// const { RedisStore } = require("rate-limit-redis");
// const logger = require("./utils/logger");

const expressProxy = require("express-http-proxy");

const app = express();

const PORT = process.env.PORT || 3000;



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100 // Limit each IP to 100 requests per 15 minutes
})




//  SECURITY & BASIC MIDDLEWARE
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter)






// // 🔀 PROXY ROUTES + SERVICE LOGS
// logger.info("Proxy Mounted: /ai → http://localhost:3001");
// app.use("/ai", expressProxy("http://localhost:3001"));

// logger.info("Proxy Mounted: /auth → http://localhost:3002");
app.use("/user", expressProxy("http://localhost:3002"));

// logger.info("Proxy Mounted: /posts → http://localhost:3003");
app.use("/postnews", expressProxy("http://localhost:3003"));

// app.use("/readnews", expressProxy("http://localhost:3003"));
// app.use("/notifynews", expressProxy("http://localhost:3007"));



// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`API Gateway running on port http://localhost:${PORT}`);
  
});
