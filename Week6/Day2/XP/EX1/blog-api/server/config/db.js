import { Pool } from 'pg'

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog_db',
  password: '123456',
  port: 5432,
});

