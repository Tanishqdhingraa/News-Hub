import News from "../models/news.model.js";

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "News fetched successfully",
      count: news.length,
      data: news
    });

  } catch (error) {
    console.error("Fetch News Error:", error);
    res.status(500).json({ message: "Server error while fetching news" });
  }
};
