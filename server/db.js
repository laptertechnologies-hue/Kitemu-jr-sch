import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_XBNq1ChYM2bm@ep-quiet-thunder-atxl3y2y-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

export const query = (text, params) => pool.query(text, params);
