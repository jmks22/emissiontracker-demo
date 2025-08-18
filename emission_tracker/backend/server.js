import express, { json } from 'express';
import cors from 'cors';
const app = express();
import customerRequestRoutes from './routes/customerRequests.js';
import fleetRoutes from './routes/fleets.js';
import emissionsDownloadRoutes from './routes/emissions-download.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config();

app.use(cors());
app.use(json());

app.use('/api/auth', authRoutes);
app.use('/api/fleets', fleetRoutes);
app.use('/api/customer-requests', customerRequestRoutes);
app.use('/api/emissions-download', emissionsDownloadRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
