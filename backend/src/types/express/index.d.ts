import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// User model interface
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

// Task model interface
export interface ITask {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// JWT payload interface (customize as needed)
export interface JwtPayloadCustom extends JwtPayload {
  id: string;
  username: string;
  email: string;
}

// Custom request type including user from JWT payload
export interface AuthRequest extends Request {
  user?: JwtPayloadCustom | string;
}
