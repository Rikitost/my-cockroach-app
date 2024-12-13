import pool from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM tasks');
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        const { title } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
                [title]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error adding task:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
