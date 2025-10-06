import express from 'express';
import {
  getTransactions,
  getTransaction,
} from '../../controllers/client/transactionController.js';
import { protectClient } from '../../middleware/authClient.js';

const router = express.Router();
router.use(protectClient);

router.get('/', getTransactions);
router.get('/:id', getTransaction);

export default router;
