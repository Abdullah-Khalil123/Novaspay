import express from 'express';
import {
  getAllAccounts,
  createAccount,
  deleteAccount,
  getAccountById,
  updateAccount,
} from '../controllers/accountController.js';
const router = express.Router();

router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;
