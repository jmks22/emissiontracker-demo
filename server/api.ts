import express from 'express';
import { default as GeotabApi } from 'mg-api-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const auth = {
  credentials: {
    database: process.env.DATABASE || '',
    userName: process.env.USER_NAME || '',
    password: process.env.PASSWORD || ''
  },
  path: 'my.geotab.com'
};

const geotab = new GeotabApi(auth);

(async () => {
  try {
    await geotab.authenticate();
    console.log('✅ Authenticated to Geotab');
  } catch (err: any) {
    console.error('❌ Geotab authentication failed:', err.message);
    process.exit(1);
  }
})();

async function getAll(typeName: string): Promise<any[]> {
  const result = await geotab.call('Get', { typeName, search: {} });
  return Array.isArray(result) ? result : [result];
}

app.get('/api/trips', async (req, res) => {
  try {
    const trips = await getAll('Trip');
    res.json(trips);
  } catch (err: any) {
    console.error('Error fetching Trips:', err.message);
    res.status(500).json({ error: 'Unable to fetch Trip data' });
  }
});

app.get('/api/devices', async (req, res) => {
  try {
    const devices = await getAll('Device');
    res.json(devices);
  } catch (err: any) {
    console.error('Error fetching Devices:', err.message);
    res.status(500).json({ error: 'Unable to fetch Device data' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await getAll('User');
    res.json(users);
  } catch (err: any) {
    console.error('Error fetching Users:', err.message);
    res.status(500).json({ error: 'Unable to fetch User data' });
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.listen(PORT, () => {
  console.log(`📡  Geotab proxy listening on http://localhost:${PORT}/`);
});
