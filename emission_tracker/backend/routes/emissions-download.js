import express from 'express';
import PDFDocument from 'pdfkit';

const router = express.Router();

/* -------------------- DUMMY REQUESTS LIST -------------------- */
const dummyRequests = [
  {
    id: 'REQ-123',
    name: 'FY 2024-25',
    requestDate: '13/04/2025',
    dateRange: '2025-01-01 to 2025-03-31',
    fileType: 'PDF',
    requester: 'Placeholder User',
    status: 'Pending',
  },
  {
    id: 'REQ-456',
    name: 'Q1 2025',
    requestDate: '12/04/2025',
    dateRange: '2025-04-01 to 2025-06-30',
    fileType: 'PDF',
    requester: 'Placeholder User',
    status: 'Approved',
  },
];

router.get('/', (_req, res) => {
  res.json(dummyRequests);
});

/* -------------------- DUMMY DOWNLOAD -------------------- */
router.get('/:id/download', (req, res) => {
  const requestId = req.params.id;
  const rr = dummyRequests.find(r => r.id === requestId);

  if (!rr) {
    return res.status(404).json({ error: 'Request not found (dummy)' });
  }

  // Parse range if possible
  const [startStr, endStr] = rr.dateRange.split(/\s+to\s+/i);
  const start = new Date(startStr);
  const end = new Date(endStr);
  const days = Math.max(1, Math.round((end - start) / 86400000) + 1);

  // ---- PLACEHOLDER TOTALS ----
  const totals = {
    co:  (days * 42.5).toFixed(2),
    co2: (days * 1530.75).toFixed(2),
    hc:  (days * 10.2).toFixed(2),
    nox: (days * 25.8).toFixed(2),
    pm:  (days * 5.4).toFixed(2),
  };

  const baseName = `emissions_${requestId}.pdf`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${baseName}"`);

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(res);

  doc.fontSize(18).text('Emissions Report (Placeholder)', { align: 'center' });
  doc.moveDown();
  doc.fontSize(11).text(`Request ID: ${rr.id}`);
  doc.text(`Requester: ${rr.requester}`);
  doc.text(`Date range: ${rr.dateRange}`);
  doc.moveDown();

  doc.fontSize(13).text('Totals (grams):');
  doc.moveDown(0.5);

  const rows = [
    ['Carbon Monoxide (CO)', totals.co],
    ['Carbon Dioxide (CO₂)', totals.co2],
    ['Hydrocarbons (HC)', totals.hc],
    ['Nitrogen Oxides (NOₓ)', totals.nox],
    ['Particulate Matter (PM)', totals.pm],
  ];
  rows.forEach(([label, val]) => doc.text(`${label}: ${val}`));

  doc.end();
});

export default router;
