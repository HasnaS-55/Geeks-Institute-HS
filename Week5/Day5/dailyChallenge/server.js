import express from "express";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const emojis = [
  { emoji: "😀", name: "Smile" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🚗", name: "Car" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🎉", name: "Party" },
  { emoji: "🏀", name: "Basketball" },
  { emoji: "📚", name: "Books" },
  { emoji: "🎧", name: "Headphones" },
  { emoji: "🌧️", name: "Rain" },
  { emoji: "⏰", name: "Alarm" },
  { emoji: "🌙", name: "Moon" },
  { emoji: "🍎", name: "Apple" },
  { emoji: "✈️", name: "Airplane" },
  { emoji: "🏡", name: "House" }
];

const SESSIONS = new Map(); // sessionId -> { score, q: { id, answer } }
const LEADERBOARD = [];     // { name, score, when }

function ensureSession(req, res, next) {
  let sid = req.cookies.sid;
  if (!sid) {
    sid = randomUUID();
    res.cookie("sid", sid, { httpOnly: true, sameSite: "lax" });
  }
  if (!SESSIONS.has(sid)) SESSIONS.set(sid, { score: 0, q: null });
  req.sid = sid;
  req.session = SESSIONS.get(sid);
  next();
}

function pickQuestion(k = 4) {
  const correct = emojis[Math.floor(Math.random() * emojis.length)];
  const pool = emojis.filter(e => e.name !== correct.name);
  // sample (k-1) unique distractors
  for (let i = pool.length - 1; i > 0; i--) { // shuffle pool
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const options = [correct.name, ...pool.slice(0, k - 1).map(e => e.name)];
  // shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { id: randomUUID(), emoji: correct.emoji, options, answer: correct.name };
}

app.get("/api/question", ensureSession, (req, res) => {
  const q = pickQuestion(4);
  req.session.q = { id: q.id, answer: q.answer };
  res.json({ id: q.id, emoji: q.emoji, options: q.options });
});

app.post("/api/guess", ensureSession, (req, res) => {
  const { id, guess } = req.body || {};
  const current = req.session.q;
  if (!current || current.id !== id) {
    return res.status(400).json({ error: "Invalid or expired question." });
  }
  const correct = guess === current.answer;
  if (correct) req.session.score += 1;
  // clear current question so re-guessing isn’t allowed
  req.session.q = null;
  res.json({ correct, correctAnswer: current.answer, score: req.session.score });
});

app.get("/api/leaderboard", (_req, res) => {
  res.json(LEADERBOARD.slice(0, 10));
});

app.post("/api/submit-score", ensureSession, (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: "Name is required." });
  LEADERBOARD.push({ name: name.trim().slice(0, 30), score: req.session.score, when: new Date().toISOString() });
  LEADERBOARD.sort((a, b) => b.score - a.score || a.when.localeCompare(b.when));
  res.json({ ok: true, score: req.session.score });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Emoji game on http://localhost:${PORT}`));
