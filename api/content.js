import { query } from './db.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default async function handler(req, res) {
  // CORS Headers (in case of local testing)
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
      const result = await query('SELECT section_key, text_value FROM content');
      const content = result.rows.reduce((acc, row) => {
        acc[row.section_key] = row.text_value;
        return acc;
      }, {});
      return res.status(200).json(content);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch content' });
    }
  }

  if (req.method === 'PUT') {
    const { section_key, text_value } = req.body;
    try {
      await query(
        `INSERT INTO content (section_key, text_value) 
         VALUES ($1, $2) 
         ON CONFLICT (section_key) DO UPDATE SET text_value = EXCLUDED.text_value`,
        [section_key, text_value]
      );
      return res.status(200).json({ message: 'Content updated successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update content' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
