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
    const { student_name, grade, parent_name, phone, email, address } = req.body;
    try {
      await query(
        `INSERT INTO admissions (student_name, grade, parent_name, phone, email, address) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [student_name, grade, parent_name, phone, email, address]
      );
      return res.status(200).json({ success: true, message: 'Admission application submitted successfully!' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to submit application' });
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM admissions ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch admissions' });
    }
  }

  if (req.method === 'PUT') {
    const { id, status } = req.body;
    try {
      await query('UPDATE admissions SET status = $1 WHERE id = $2', [status, id]);
      return res.status(200).json({ success: true, message: 'Status updated' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update status' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
