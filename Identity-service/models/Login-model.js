import mongoose from "mongoose";
import bcrypt from "bcrypt";

const loginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// ✅ Hash the password before saving (if needed)
loginSchema.pre("save", async function (next) {
  try {
    // If password is not modified, skip hashing
    if (!this.isModified("password")) return next();

    // Generate salt and hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Compare entered password with hashed one
loginSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Model
const Login = mongoose.model("Login", loginSchema);

export default Login;
