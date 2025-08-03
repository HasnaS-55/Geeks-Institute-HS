
import pool from '../config/db.js'


export const User = {
    getAllUsers: async () => {
        const sql = 'SELECT * FROM users'
        const result = await pool.query(sql)
        return result.rows
    },


    getUser: async (id) => {
        const sql = 'SELECT * FROM users WHERE id = $1'
        const result = await pool.query(sql, [id])
        return result.rows[0]
    },


    updateUser: async (id, first_name, last_name) => {
        const sql = 'UPDATE users SET firstname = COALESCE($2, name), lastname = COALESCE($3, lastname) WHERE id = $1 RETURNING *'
        const result = await pool.query(sql, [id, first_name, last_name])
        return result.rows[0]
    }
}