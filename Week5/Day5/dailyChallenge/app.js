const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const emojis = [
    { emoji: '😀', name: 'Grinning Face' },
    { emoji: '🐶', name: 'Dog Face' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '🎸', name: 'Guitar' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🦄', name: 'Unicorn' },
    { emoji: '🍿', name: 'Popcorn' },
    { emoji: '⚽', name: 'Soccer Ball' },
    { emoji: '🎮', name: 'Video Game' }
];


let currentEmoji = null;
let options = [];
let score = 0;
let leaderboard = [];


function getRandomEmoji() {
    const correct = emojis[Math.floor(Math.random() * emojis.length)];
    const incorrect = emojis
        .filter(e => e.name !== correct.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    currentEmoji = correct.emoji;
    options = [correct.name, ...incorrect.map(i => i.name)].sort(() => 0.5 - Math.random());
    
    return { emoji: correct.emoji, options };
}
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/api/question', (req, res) => {
    const question = getRandomEmoji();
    res.json(question);
});

app.post('/api/guess', (req, res) => {
    const { guess } = req.body;
    const isCorrect = emojis.find(e => e.emoji === currentEmoji).name === guess;
    
    if (isCorrect) {
        score++;
    }
    
    res.json({ 
        correct: emojis.find(e => e.emoji === currentEmoji).name,
        isCorrect,
        score 
    });
});

app.post('/api/leaderboard', (req, res) => {
    const { name } = req.body;
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
    score = 0; 
    res.json(leaderboard);
});

app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});