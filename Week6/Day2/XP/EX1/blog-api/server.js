const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./server/routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use('/posts', postRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});