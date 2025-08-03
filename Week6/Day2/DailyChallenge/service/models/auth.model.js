import { hashPassword } from "../utils/hashPassword.js"
import pool from '../config/db.js'

export const User = {
  createUser: async (email, username, firstname, lastname, password) => {
    const hashedPWD = await hashPassword(password);
    const sql =
      "INSERT INTO users (email, username, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(sql, [
      email,
      username,
      firstname,
      lastname,
      hashedPWD,
    ]);

    return result.rows[0];
  },
  getUserByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },
};


