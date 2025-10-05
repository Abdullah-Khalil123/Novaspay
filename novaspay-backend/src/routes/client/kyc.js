import express from 'express';
import {
  createOrUpdateClientKYC,
  getClientKYC,
} from '../../controllers/client/kycController.js';
import { protectClient } from '../../middleware/authClient.js';

const router = express.Router();

router.use(protectClient);
router.get('/', getClientKYC);
router.put('/', createOrUpdateClientKYC);

export default router;
