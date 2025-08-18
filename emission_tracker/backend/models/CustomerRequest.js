import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const CustomerRequest = sequelize.define('ReportRequest', {
  report_request_id: { type: DataTypes.INTEGER, primaryKey: true },
  user_id: DataTypes.INTEGER,
  date_range: DataTypes.STRING,
  file_type: DataTypes.STRING,
  request_date: DataTypes.STRING,
  request_status: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  tableName: 'Report_Request',
  timestamps: false
});

export default CustomerRequest;
