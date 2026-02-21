import express from "express";
import { getAllNews } from "../controllers/news.controller.js";

const router = express.Router();

router.get("/getallnews", getAllNews);

export default router;
