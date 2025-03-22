import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import pool from '../db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

const documentSchema = z.object({
  type_id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

router.use(authenticateToken);

// Get all documents for the authenticated user
router.get('/', async (req: AuthRequest, res) => {
  try {
    const [documents] = await pool.execute(
      'SELECT * FROM documents WHERE user_id = ? ORDER BY created_at DESC',
      [req.user!.id]
    );
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Create a new document
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { type_id, title, content, metadata } = documentSchema.parse(req.body);
    const id = uuidv4();

    await pool.execute(
      'INSERT INTO documents (id, user_id, type_id, title, content, metadata) VALUES (?, ?, ?, ?, ?, ?)',
      [id, req.user!.id, type_id, title, content, JSON.stringify(metadata || {})]
    );

    const [document] = await pool.execute(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    ) as [any[], any];

    res.status(201).json(document[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create document' });
  }
});

// Update a document
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { type_id, title, content, metadata } = documentSchema.parse(req.body);
    
    const [result] = await pool.execute(
      'UPDATE documents SET type_id = ?, title = ?, content = ?, metadata = ? WHERE id = ? AND user_id = ?',
      [type_id, title, content, JSON.stringify(metadata || {}), req.params.id, req.user!.id]
    ) as [any, any];

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const [document] = await pool.execute(
      'SELECT * FROM documents WHERE id = ?',
      [req.params.id]
    ) as [any[], any];

    res.json(document[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// Delete a document
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM documents WHERE id = ? AND user_id = ?',
      [req.params.id, req.user!.id]
    ) as [any, any];

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;