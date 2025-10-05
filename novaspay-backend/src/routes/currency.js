import express from 'express';
import {
  createCurrencyRate,
  getCurrencyRates,
  updateCurrencyRate,
  getAllCurrencies,
} from '../controllers/currencyController.js';
const router = express.Router();

router.get('/all', getAllCurrencies);
router.get('/', getCurrencyRates);
router.post('/', createCurrencyRate);
router.put('/', updateCurrencyRate);

export default router;
