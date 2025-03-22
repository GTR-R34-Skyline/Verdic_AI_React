import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';
import { z } from 'zod';

const router = Router();

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    ) as [any[], any];

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    await pool.execute(
      'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
      [userId, email, hashedPassword]
    );

    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET || '123456',
      { expiresIn: '24h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);

    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as [any[], any];

    const user = users[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || '123456',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;