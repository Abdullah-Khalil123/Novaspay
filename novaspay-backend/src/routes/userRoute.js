import express from 'express';
import {
  login,
  register,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// router.post('/create', createUser);
// router.put('/:id', updateUser);
// router.get('/all', getAllUsers);
// router.get('/:id', getUser);

// router.delete('/:id', deleteUser);
export default router;
