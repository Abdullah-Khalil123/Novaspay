import express from 'express';
import { getAccounts } from '../../controllers/client/accountController.js';
import { protectClient } from '../../middleware/authClient.js';

const router = express.Router();

router.use(protectClient);
router.get('/', getAccounts);

export default router;
