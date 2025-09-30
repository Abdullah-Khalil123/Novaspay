import express from 'express';
import {
  createVA,
  deleteVA,
  getAllVAs,
  getVAById,
  updateVA,
} from '../controllers/vaController.js';
const router = express.Router();

router.get('/', getAllVAs);
router.get('/:id', getVAById);
router.post('/', createVA);
router.put('/:id', updateVA);
router.delete('/:id', deleteVA);

export default router;
