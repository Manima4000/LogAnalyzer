import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class HoneypotConfig extends Model {
    public port!: number;
    public enabled!: boolean;
    public banner?: string;
}

HoneypotConfig.init({
    port: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    sequelize,
    modelName: "HoneypotConfig",
    tableName: "honeypot_configs",
    timestamps: false
});

export default HoneypotConfig;