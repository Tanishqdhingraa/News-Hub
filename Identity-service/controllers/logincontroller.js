import Login from "../models/Login.js";
import SignUp from "../models/SignUp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// 🔐 LOGIN CONTROLLER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find registered user
    const user = await SignUp.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Save failed login attempt
      await Login.create({ email, password });
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Save successful login record
    await Login.create({ email, password });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
