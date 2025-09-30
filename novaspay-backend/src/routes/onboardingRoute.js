import express from 'express';
import {
  createOnBoarding,
  deleteOnBoarding,
  getAllOnBoardings,
  getOnBoardingById,
  updateOnBoarding,
} from '../controllers/onboardingController.js';
const router = express.Router();

router.get('/', getAllOnBoardings);
router.get('/:id', getOnBoardingById);
router.post('/', createOnBoarding);
router.put('/:id', updateOnBoarding);
router.delete('/:id', deleteOnBoarding);

export default router;
