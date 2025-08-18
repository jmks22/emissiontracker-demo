import express from 'express';
import ReportRequest from '../models/reportRequest.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await ReportRequest.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'] // from the User table
        }
      ],
      limit: 100
    });

    const formatted = results.map(item => ({
      name: `Request ${item.report_request_id}`, 
      requestDate: item.request_date,
      dateRange: item.date_range,
      fileType: item.file_type,
      requester: item.User?.user_name || 'Unknown',
      status: item.request_status
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching report requests:', err);
    res.status(500).json({ error: 'Failed to load report requests' });
  }
});

export default router;
