import express from 'express';
import cors from 'cors';
import { query } from './db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/content', async (req, res) => {
  try {
    const result = await query('SELECT section_key, text_value FROM content');
    const content = result.rows.reduce((acc, row) => {
      acc[row.section_key] = row.text_value;
      return acc;
    }, {});
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.put('/api/content', async (req, res) => {
  const { section_key, text_value } = req.body;
  try {
    await query(
      `INSERT INTO content (section_key, text_value) 
       VALUES ($1, $2) 
       ON CONFLICT (section_key) DO UPDATE SET text_value = EXCLUDED.text_value`,
      [section_key, text_value]
    );
    res.json({ message: 'Content updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, token: 'fake-jwt-token-for-demo' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
