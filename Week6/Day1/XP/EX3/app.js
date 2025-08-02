import express from 'express';
import booksRouter from './routes/books.js';

const app = express();
app.use(express.json());


app.use('/books', booksRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});