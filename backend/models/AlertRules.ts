// models/AlertRule.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface AlertRuleAttributes {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  matchSource?: string;
  matchSeverity?: 'info' | 'warning' | 'critical';
  containsMessage?: string;
}

export interface AlertRuleCreationAttributes extends Optional<AlertRuleAttributes, 'id'> {}

class AlertRule extends Model<AlertRuleAttributes, AlertRuleCreationAttributes>
  implements AlertRuleAttributes {
  public id!: string;
  public type!: string;
  public severity!: 'low' | 'medium' | 'high';
  public matchSource?: string;
  public matchSeverity?: 'info' | 'warning' | 'critical';
  public containsMessage?: string;
}

AlertRule.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    severity: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false
    },
    matchSource: {
      type: DataTypes.STRING,
      allowNull: true
    },
    matchSeverity: {
      type: DataTypes.ENUM('info', 'warning', 'critical'),
      allowNull: true
    },
    containsMessage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'AlertRule',
    tableName: 'alert_rules',
    timestamps: false
  }
);

export default AlertRule;