import express from 'express';
import {
  createKYC,
  deleteKYC,
  getAllKYCs,
  getKYCById,
  updateKYC,
} from '../controllers/kycController.js';
const router = express.Router();

router.get('/', getAllKYCs);
router.get('/:id', getKYCById);
router.post('/', createKYC);
router.put('/:id', updateKYC);
router.delete('/:id', deleteKYC);

export default router;
