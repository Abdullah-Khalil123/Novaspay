import express from 'express';
import {
  createClientKYC,
  getClientKYC,
  updateClientKYC,
} from '../../controllers/client/kycController.js';
import { protectClient } from '../../middleware/authClient.js';

const router = express.Router();

router.use(protectClient);
router.get('/', getClientKYC);
router.post('/', createClientKYC);
router.put('/', updateClientKYC);

export default router;
