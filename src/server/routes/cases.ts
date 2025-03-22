import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import pool from '../db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const caseSchema = z.object({
  case_number: z.string(),
  client_name: z.string(),
  type: z.string(),
  status: z.string(),
  due_date: z.string().nullable(),
  description: z.string().nullable(),
  metadata: z.record(z.unknown()).optional(),
});

router.use(authenticateToken);

// Get all cases for the authenticated user
router.get('/', async (req: AuthRequest, res) => {
  try {
    const [cases] = await pool.execute(
      'SELECT * FROM cases WHERE user_id = ? ORDER BY created_at DESC',
      [req.user!.id]
    );
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
});

// Create a new case
router.post('/', async (req: AuthRequest, res) => {
  try {
    const caseData = caseSchema.parse(req.body);
    const id = uuidv4();

    await pool.execute(
      'INSERT INTO cases (id, user_id, case_number, client_name, type, status, due_date, description, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        req.user!.id,
        caseData.case_number,
        caseData.client_name,
        caseData.type,
        caseData.status,
        caseData.due_date,
        caseData.description,
        JSON.stringify(caseData.metadata || {})
      ]
    );

    const [newCase] = await pool.execute(
      'SELECT * FROM cases WHERE id = ?',
      [id]
    ) as [any[], any];

    res.status(201).json(newCase[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create case' });
  }
});

// Update a case
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const caseData = caseSchema.parse(req.body);
    
    const [result] = await pool.execute(
      'UPDATE cases SET case_number = ?, client_name = ?, type = ?, status = ?, due_date = ?, description = ?, metadata = ? WHERE id = ? AND user_id = ?',
      [
        caseData.case_number,
        caseData.client_name,
        caseData.type,
        caseData.status,
        caseData.due_date,
        caseData.description,
        JSON.stringify(caseData.metadata || {}),
        req.params.id,
        req.user!.id
      ]
    ) as [any, any];

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }

    const [updatedCase] = await pool.execute(
      'SELECT * FROM cases WHERE id = ?',
      [req.params.id]
    ) as [any[], any];

    res.json(updatedCase[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update case' });
  }
});

// Delete a case
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM cases WHERE id = ? AND user_id = ?',
      [req.params.id, req.user!.id]
    ) as [any, any];

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete case' });
  }
});

export default router;