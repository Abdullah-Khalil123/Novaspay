import express from 'express';
const router = express.Router();
import { getCurrencyRates } from '../../controllers/currencyController.js';
import { protectClient } from '../../middleware/authClient.js';

router.use(protectClient);
router.get('/', getCurrencyRates);

export default router;
