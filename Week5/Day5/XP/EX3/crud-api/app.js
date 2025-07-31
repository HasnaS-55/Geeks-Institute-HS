import express from "express";
import { fetchPost } from "./data/dataServer.js";

const Port = 5000;
const app = express();
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    const posts = await fetchPosts()

    console.log("Successfully retrieved posts! Sending response...");
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch posts",
      details: error.message,
    });
  }
});

app.listen(Port, () => {
  console.log(`server running on port ${Port}`);
});
