require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const postRoutes = require("./routes/postroutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect MongoDB

app.get("/",(req , res)=>{
    res.send(`🤷‍♀️ Post service here `) 
})
connectDB();

// Routes
app.use("/api/v1", postRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`✅ Post Service running on port http://localhost:${PORT}`));
