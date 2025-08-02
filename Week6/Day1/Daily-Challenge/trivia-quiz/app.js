import express from 'express';
import quizRouter from './routes/quiz.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/quiz', quizRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Quiz game running on http://localhost:${PORT}`);
});