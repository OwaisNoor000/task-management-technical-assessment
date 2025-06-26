import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

 
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'createdAt']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Profile fetch failed', details: err });
  }
};
