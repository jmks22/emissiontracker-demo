import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Fleet from './Fleet.js';

const FleetDetails = sequelize.define('FleetDetails', {
  truck_id: { type: DataTypes.INTEGER, primaryKey: true },
  fleet_name: DataTypes.STRING,
  fleet_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  created_at: DataTypes.DATE
}, {
  tableName: 'Fleet_Details',
  timestamps: false
});

// Associations
FleetDetails.belongsTo(User, { foreignKey: 'user_id' });
FleetDetails.belongsTo(Fleet, { foreignKey: 'fleet_id' });

export default FleetDetails;
