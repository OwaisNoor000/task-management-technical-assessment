import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, createTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

export default router;
