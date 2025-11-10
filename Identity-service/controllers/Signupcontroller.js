import SignUp from "../models/SignUp.js";
import jwt from "jsonwebtoken";

// Secret for JWT (use .env in real apps)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// 🧠 REGISTER USER CONTROLLER
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await SignUp.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create and save new user (password is auto-hashed in model)
    const newUser = new SignUp({ email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};
