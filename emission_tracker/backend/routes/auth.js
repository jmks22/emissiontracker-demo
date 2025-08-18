import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const responseUser = {
      user_id: user.user_id,
      user_name: user.name,  
      user_email: user.email,
      user_type: user.role,  
      company: user.company ?? null
    };

    return res.json({ success: true, user: responseUser });
  } catch (err) {
    console.error('Auth login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
