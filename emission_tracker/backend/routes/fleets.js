import express from 'express';
import FleetDetails from '../models/FleetDetails.js';
import User from '../models/User.js';
import Fleet from '../models/Fleet.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await FleetDetails.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name']
        },
        {
          model: Fleet,
          attributes: ['no_of_trucks', 'co2_fleet_amount']
        }
      ],
      limit: 100
    });

    const formatted = results.map(item => ({
      name: item.fleet_name,
      manager: item.User.user_name,
      trucks: item.Fleet.no_of_trucks,
      co2: `${Number(item.Fleet.co2_fleet_amount).toLocaleString()} kg`
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error joining tables:', err);
    res.status(500).json({ error: 'Join failed' });
  }
});

export default router;
