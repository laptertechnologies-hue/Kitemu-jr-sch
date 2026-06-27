import pkg from 'pg';
const { Pool } = pkg;

// Use process.env.DATABASE_URL or specific string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_XBNq1ChYM2bm@ep-quiet-thunder-atxl3y2y-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

export const query = (text, params) => pool.query(text, params);
