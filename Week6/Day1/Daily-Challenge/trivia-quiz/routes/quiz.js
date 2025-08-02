import express from 'express';
const router = express.Router();


const triviaQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  }
];


let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];


router.get('/', (req, res) => {
    try {
        if (currentQuestionIndex >= triviaQuestions.length) {
            return res.redirect('/quiz/score');
        }
        
        const question = triviaQuestions[currentQuestionIndex];
        res.json({
            question: question.question,
            questionNumber: currentQuestionIndex + 1,
            totalQuestions: triviaQuestions.length
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', (req, res) => {
    try {
        if (currentQuestionIndex >= triviaQuestions.length) {
            return res.redirect('/quiz/score');
        }
        
        const userAnswer = req.body.answer;
        const currentQuestion = triviaQuestions[currentQuestionIndex];
        const isCorrect = userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();
        
        userAnswers.push({
            question: currentQuestion.question,
            userAnswer,
            correctAnswer: currentQuestion.answer,
            isCorrect
        });
        
        if (isCorrect) {
            score++;
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < triviaQuestions.length) {
            res.json({
                feedback: isCorrect ? "✅ Correct!" : "❌ Incorrect!",
                nextQuestion: `/quiz`,
                score
            });
        } else {
            res.redirect('/quiz/score');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/score', (req, res) => {
    try {
        const result = {
            finalScore: `${score}/${triviaQuestions.length}`,
            percentage: Math.round((score / triviaQuestions.length) * 100),
            details: userAnswers
        };
        
        
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;