const pool = require('../config/db');

const getAllPosts = async () => {
  const { rows } = await pool.query('SELECT * FROM posts ORDER BY id');
  return rows;
};

const getPostById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return rows[0];
};

const createPost = async (title, content) => {
  const { rows } = await pool.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return rows[0];
};

const updatePost = async (id, title, content) => {
  const { rows } = await pool.query(
    'UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return rows[0];
};

const deletePost = async (id) => {
  const { rows } = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return rows[0];
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};