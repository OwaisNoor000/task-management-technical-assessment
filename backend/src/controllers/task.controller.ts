import { Request, Response } from 'express';
import { Task } from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  try {
    const tasks = await Task.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const { title, description, status = 'pending', priority = 'medium' } = req.body;
  try {
    const task = await Task.create({ title, description, status, priority, userId: userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const taskId = req.params.id;
  const { title, description, status, priority } = req.body;
  try {
    const task = await Task.findOne({ where: { id: taskId, userId: userId } });
    if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });

    await task.update({ title, description, status, priority });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({ where: { id: taskId, userId: userId } });
    if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err });
  }
};
