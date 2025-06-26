import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './models/index';
import authRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
