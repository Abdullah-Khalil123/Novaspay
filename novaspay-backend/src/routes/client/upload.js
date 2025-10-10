// routes/upload.js
import express from 'express';
import upload from '../../middleware/mutler.js';
import { protectClient } from '../../middleware/authClient.js';

const router = express.Router();

// Single file upload route
router.use(protectClient);
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Build the URL to access the uploaded file
  const fileUrl = `/uploads/${req.file.filename}`;

  res.json({
    message: 'File uploaded successfully',
    url: fileUrl,
  });
});

export default router;
