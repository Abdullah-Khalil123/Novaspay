import express from 'express';
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
} from '../controllers/adminCreateController.js';

const router = express.Router();

router.get('/all', getAdmins);
router.post('/', createAdmin);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
