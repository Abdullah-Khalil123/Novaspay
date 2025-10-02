import express from 'express';
import { protectClient } from '../../middleware/authClient.js';

import {
  clientLogin,
  clientResetPassword,
  clientRegister,
} from '../../controllers/client/clientAuth.js';

const router = express.Router();

router.post('/login', clientLogin);
router.post('/register', clientRegister);

router.use(protectClient);
router.post('/reset-password', clientResetPassword);

export default router;
