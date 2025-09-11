// models/Alert.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AlertAttributes {
  id: number;
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved';
  logId: number;
  createdAt: Date;
}

interface AlertCreationAttributes extends Optional<AlertAttributes, 'id' | 'status' | 'createdAt'> {}

class Alert extends Model<AlertAttributes, AlertCreationAttributes> implements AlertAttributes {
  public id!: number;
  public type!: string;
  public message!: string;
  public severity!: 'low' | 'medium' | 'high';
  public status!: 'open' | 'resolved';
  public logId!: number;
  public createdAt!: Date;
}

Alert.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    severity: { type: DataTypes.ENUM('low', 'medium', 'high'), allowNull: false },
    status: { type: DataTypes.ENUM('open', 'resolved'), defaultValue: 'open' },
    logId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'Alert',
    tableName: 'alerts',
    timestamps: false,
  }
);

export default Alert;