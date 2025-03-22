import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import pool from '../db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const precedentSchema = z.object({
  title: z.string(),
  court: z.string(),
  date: z.string(),
  category: z.string(),
  summary: z.string(),
  content: z.string(),
  citations: z.array(z.unknown()).optional(),
});

router.use(authenticateToken);

// Get all precedents with optional search
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { query } = req.query;
    let sql = 'SELECT * FROM precedents';
    const params: any[] = [];

    if (query) {
      sql += ' WHERE title LIKE ? OR content LIKE ? OR summary LIKE ?';
      const searchTerm = `%${query}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY date DESC';

    const [precedents] = await pool.execute(sql, params);
    res.json(precedents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch precedents' });
  }
});

// Create a new precedent
router.post('/', async (req: AuthRequest, res) => {
  try {
    const precedentData = precedentSchema.parse(req.body);
    const id = uuidv4();

    await pool.execute(
      'INSERT INTO precedents (id, title, court, date, category, summary, content, citations) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        precedentData.title,
        precedentData.court,
        precedentData.date,
        precedentData.category,
        precedentData.summary,
        precedentData.content,
        JSON.stringify(precedentData.citations || [])
      ]
    );

    const [precedent] = await pool.execute(
      'SELECT * FROM precedents WHERE id = ?',
      [id]
    ) as [any[], any];

    res.status(201).json(precedent[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create precedent' });
  }
});

export default router;