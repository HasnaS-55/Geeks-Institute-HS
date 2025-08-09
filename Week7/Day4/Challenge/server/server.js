// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5600;

// Middleware
app.use(cors());
app.use(express.json());

// GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body); // Log the received data
  const { value } = req.body;
  res.json({
    message: `I received your POST request. This is what you sent me: ${value}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});