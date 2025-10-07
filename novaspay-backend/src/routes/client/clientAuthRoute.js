import express from 'express';
import { protectClient } from '../../middleware/authClient.js';

import {
  clientLogin,
  clientResetPassword,
  clientRegister,
  sendVerificationOTP,
  verifyEmailOTP,
} from '../../controllers/client/clientAuth.js';

const router = express.Router();

router.post('/login', clientLogin);
router.post('/register', clientRegister);

router.post('/send-otp', sendVerificationOTP);
router.post('/verify-otp', verifyEmailOTP);

router.use(protectClient);
router.post('/reset-password', clientResetPassword);

export default router;
