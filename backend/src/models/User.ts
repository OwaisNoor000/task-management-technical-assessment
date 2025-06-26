import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import { IUser } from '../types/express/index';

// We exclude optional fields for creation (like `id`, `createdAt`, `updatedAt`)
type UserCreationAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: true, 
});