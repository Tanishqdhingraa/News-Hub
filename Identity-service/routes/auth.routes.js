import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/middlewares.js";

const router = express.Router();


router.get("/getalluser",protect, getAllUsers);

router.post("/signup", registerUser);
router.post("/login", loginUser);


export default router;
