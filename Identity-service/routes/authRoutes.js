import express from "express";
import { loginUser } from "../controllers/logincontroller.js";
import { registerUser } from "../controllers/Signupcontroller.js";


const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
