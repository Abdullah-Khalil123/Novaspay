import express from 'express';
import {
  getApplications,
  createApplication,
} from '../../controllers/client/applicationController.js';
import { protectClient } from '../../middleware/authClient.js';

const router = express.Router();

router.use(protectClient);
router.get('/', getApplications);
router.post('/', createApplication);

export default router;
