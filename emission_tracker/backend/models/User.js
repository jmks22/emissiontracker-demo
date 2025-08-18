import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: { type: DataTypes.STRING, field: 'user_name' },
  email: { type: DataTypes.STRING, field: 'user_email' },
  password: { type: DataTypes.STRING, field: 'user_password' },
  role: { type: DataTypes.STRING, field: 'user_type' },

}, {
  tableName: 'User',
  timestamps: false
});

export default User;
