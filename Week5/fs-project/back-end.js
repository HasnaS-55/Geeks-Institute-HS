import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create file or folder
app.post("/uploads/:wildcard(*)", (req, res) => {
  try {
    const wildcardPath = req.params.wildcard || "";
    const uploadPath = path.join(uploadDir, wildcardPath);
    const dirPath = path.dirname(uploadPath);
    const { content } = req.body;

    if (!wildcardPath) {
      return res.status(400).json({ message: "Path is required" });
    }

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // If path ends with slash, it's a folder
    if (wildcardPath.endsWith("/")) {
      fs.mkdirSync(uploadPath, { recursive: true });
      return res.status(200).json({
        message: "Folder created successfully",
        path: wildcardPath,
        isDirectory: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Otherwise, it's a file
    if (content === undefined) {
      return res.status(400).json({ message: "Content is required for files" });
    }

    fs.writeFileSync(uploadPath, content || "");
    const stats = fs.statSync(uploadPath);

    return res.status(200).json({
      message: "File created successfully",
      path: wildcardPath,
      isDirectory: false,
      size: stats.size,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Operation failed", error: error.message });
  }
});

// Get file content
app.get("/uploads/:wildcard(*)", (req, res) => {
  try {
    const wildcardPath = req.params.wildcard || "";
    const filePath = path.join(uploadDir, wildcardPath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    if (fs.statSync(filePath).isDirectory()) {
      return res.status(400).json({ message: "Path is a directory" });
    }

    const content = fs.readFileSync(filePath, "utf-8");
    res.status(200).json({
      content,
      path: wildcardPath,
      isDirectory: false,
      size: fs.statSync(filePath).size,
      createdAt: fs.statSync(filePath).birthtime,
      updatedAt: fs.statSync(filePath).mtime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "File read failed", error: error.message });
  }
});

// List files and folders
app.get("/uploads", (req, res) => {
  try {
    let infos = [];

    function readDirectory(dir, parent = "") {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          infos.push({
            name: parent + file + "/",
            isDirectory: true,
            size: 0,
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
          });
          readDirectory(filePath, parent + file + "/");
        } else {
          infos.push({
            name: parent + file,
            isDirectory: false,
            size: stats.size,
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
          });
        }
      });
    }

    readDirectory(uploadDir);
    res.status(200).json(infos);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Directory read failed", error: error.message });
  }
});

// Update file
app.put("/uploads/:wildcard(*)", (req, res) => {
  try {
    const wildcardPath = req.params.wildcard || "";
    const filePath = path.join(uploadDir, wildcardPath);
    const { content } = req.body;

    if (!wildcardPath) {
      return res.status(400).json({ message: "Path is required" });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    if (fs.statSync(filePath).isDirectory()) {
      return res.status(400).json({ message: "Cannot update a directory" });
    }

    if (content === undefined) {
      return res.status(400).json({ message: "Content is required" });
    }

    fs.writeFileSync(filePath, content);
    const stats = fs.statSync(filePath);

    res.status(200).json({
      message: "File updated successfully",
      path: wildcardPath,
      isDirectory: false,
      size: stats.size,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "File update failed", error: error.message });
  }
});

// Delete file/folder
app.delete("/uploads/:wildcard(*)", (req, res) => {
  try {
    const wildcardPath = req.params.wildcard || "";
    const filePath = path.join(uploadDir, wildcardPath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      message: isDirectory
        ? "Folder deleted successfully"
        : "File deleted successfully",
      path: wildcardPath,
      isDirectory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
