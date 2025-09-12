import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface LogAttributes {
  id: number;
  source: string;
  timestamp: Date;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  userId?: number;
}

export interface LogCreationAttributes extends Optional<LogAttributes, 'id'> {}

class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
    public id!: number;
    public source!: string;
    public timestamp!: Date;
    public message!: string;
    public severity!: 'info' | 'warning' | 'critical';
    public userId?: number;
}

Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
            severity: {
            type: DataTypes.ENUM('info', 'warning', 'critical'),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    },
    {
        sequelize,
        modelName: 'Log',
        tableName: 'logs',
        timestamps: false,
    }
);

export default Log;