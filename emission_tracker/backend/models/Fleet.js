import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Fleet = sequelize.define('Fleet', {
  fleet_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: DataTypes.INTEGER,
  no_of_trucks: DataTypes.INTEGER,
  co2_fleet_amount: DataTypes.STRING,
  NOx_fleet_amount: DataTypes.STRING,
  PM_fleet_amount: DataTypes.STRING,
  created_at: DataTypes.DATE,
  status: DataTypes.STRING
}, {
  tableName: 'Fleet',
  timestamps: false
});

export default Fleet;
