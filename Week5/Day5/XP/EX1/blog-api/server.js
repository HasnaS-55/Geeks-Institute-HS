const express = require("express");

let data = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    content: "JavaScript is a versatile programming language...",
  },
  {
    id: 2,
    title: "The Power of React Hooks",
    content: "React Hooks revolutionized how we write components...",
  },
  {
    id: 3,
    title: "Node.js Backend Fundamentals",
    content: "Building servers with Node.js provides incredible flexibility...",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    content: "When should you use Grid and when should you use Flexbox?...",
  },
  {
    id: 5,
    title: "Draft: Advanced TypeScript Patterns",
    content:
      "Exploring advanced TypeScript techniques for large applications...",
  },
];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/data", (req, res) => {
  try {
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fail to fetch all data" });
  }
});

app.post("/data", (req, res) => {
  try {
    const { id, title, content } = req.body;
    data.push({
        id:id, 
        title:title,
        content:content
        });

    res.json({ message: "data added succesfully" });
  } catch (err) {
    res.json({ error: "Fail to add data" });
  }
});

app.get("/data/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id)
    console.log(id);
    
    const result = data.filter((item) => id === item.id);
    
    res.json(result);
  } catch (err) {
    res.json({ error: `fail to fetch ${id}` });
  }
});

app.put("/data/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    if (!title || !content) {
      res.json({ error: "id, title and content are required" });
    }

    const index = data.findIndex((item) => item.id === id);
    
    
    data[index].title = title
    data[index].content = content
    

    res.json({ message: "title and content updated", sucess: true });
  } catch (err) {
    res.json({ error: `fail to update` });
  }
});

app.delete("/data/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result  = data.filter((item) => item.id !== id)
    data = result
    console.log(data)
   
    res.json({ message: "deleted" });
  } catch (err) {
    res.json({ error: `fail to delete` });
  }
});

app.listen(8000, () => {
  console.log(`Server running on port 3000`);
});
