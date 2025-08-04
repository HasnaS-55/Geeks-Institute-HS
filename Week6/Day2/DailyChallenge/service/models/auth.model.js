import { hashPassword } from "../utils/hashPassword.js"
import db from '../config/db.js'

export const User = {
  createUser: async (email, username, firstname, lastname, password) => {
    try {
      const sql = `
        INSERT INTO users (email, username, firstname, lastname) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, email, username, firstname, lastname`
      
      const userResult = await db.query(sql, [
        email, 
        username, 
        firstname, 
        lastname
      ]);
      
      const userId = userResult.rows[0].id;

      
      const hashedPWD = await hashPassword(password);
      const pwdSql = `
        INSERT INTO hashpwd (user_id, password_hash) 
        VALUES ($1, $2)`;
      
      await db.query(pwdSql, [userId, hashedPWD]);

      
      return userResult.rows[0];
      } catch (error) {
      
      if (error.code === '23505') {
        const detail = error.detail.includes('email') ? 'Email' : 'Username';
        throw new Error(`${detail} already exists`);
      }

    
    }
  },
  

  getUserByEmail: async (email) => {
    const sql = `SELECT u.*, h.password_hash 
      FROM users u
      JOIN hashpwd h ON u.id = h.user_id
      WHERE u.email = $1`;
    const result = await db.query(sql, [email]);
    return result.rows[0];
  },

  
};


