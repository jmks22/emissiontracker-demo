import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const ReportRequest = sequelize.define('ReportRequest', {
  report_request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_range: DataTypes.STRING,
  file_type: DataTypes.STRING,
  request_date: DataTypes.STRING,
  request_status: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  tableName: 'Report_Request',
  timestamps: false
});

ReportRequest.belongsTo(User, { foreignKey: 'user_id' });

export default ReportRequest;
