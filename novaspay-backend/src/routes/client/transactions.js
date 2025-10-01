import express from 'express';
import { getTransactions } from '../../controllers/client/transactionController.js';
import { protectClient } from '../../middleware/authClient.js';

const router = express.Router();
router.use(protectClient);

router.get('/', getTransactions);

export default router;
