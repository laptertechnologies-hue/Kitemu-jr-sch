import { query } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const result = await query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
      if (result.rows.length > 0) {
        return res.status(200).json({ success: true, token: 'fake-jwt-token-for-demo' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Login failed' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
