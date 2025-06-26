import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TaskCreationAttributes = Optional<TaskAttributes, 'id' | 'description' | 'createdAt' | 'updatedAt'>;

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public status!: string;
  public priority!: string;
  public userId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending',
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  tableName: 'tasks',
  timestamps: true,
});
