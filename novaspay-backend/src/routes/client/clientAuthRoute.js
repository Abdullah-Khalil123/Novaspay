import express from 'express';

import { clientLogin, createClient } from '../../controllers/clientAuth.js';

const router = express.Router();

router.post('/login', clientLogin);
router.get('/test', createClient);

export default router;
