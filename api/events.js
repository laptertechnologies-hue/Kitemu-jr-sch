import { query } from './db.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

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

  if (req.method === 'GET') {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      let q = 'SELECT * FROM events ORDER BY event_date DESC';
      const params = [];
      
      if (limit) {
        q += ' LIMIT $1';
        params.push(limit);
      }
      
      const result = await query(q, params);
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
  }

  if (req.method === 'POST') {
    const { title, description, image_data, event_date } = req.body;
    try {
      const result = await query(
        `INSERT INTO events (title, description, image_data, event_date) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, description, image_data, event_date]
      );
      return res.status(201).json({ success: true, event: result.rows[0] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create event' });
    }
  }

  if (req.method === 'DELETE') {
    const id = req.query.id;
    try {
      await query('DELETE FROM events WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
