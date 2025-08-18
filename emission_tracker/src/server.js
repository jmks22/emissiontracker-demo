const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Load route
const reportRoutes = require('./routes/reportRequests');
app.use('/api/report-requests', reportRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
