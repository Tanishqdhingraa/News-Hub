import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { publishUserLogin } from "../rabbitmq/producer.js";




const JWT_SECRET = process.env.JWT_SECRET;
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({ email, password });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🔥 Non-blocking signup event
    publishUserLogin({
      userId: user._id.toString(),
      email: user.email,
      name:  "News Enthusiast",
      event: "USER_SIGNED_UP"
    }).catch(err => {
      console.error("RabbitMQ signup event failed:", err);
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error("Register Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    res.status(500).json({ message: "Server error during signup" });
  }
};




/**
 * 🔐 LOGIN USER
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password +name +email");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🔥 Non-blocking event
    publishUserLogin({
      userId: user._id.toString(),
      email: user.email,
      name: user.name
    }).catch(err => {
      console.error("RabbitMQ publish failed:", err);
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};




export const getAllUsers = async (req, res) => {
  try {
    // Fetch users (password is excluded by default)
    const users = await User.find().select("_id email createdAt");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};
