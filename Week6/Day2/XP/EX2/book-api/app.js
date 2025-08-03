const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./server/routes/bookRoutes');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());


app.use('/api/books', bookRoutes);


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