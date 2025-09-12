import { Router } from 'express';
import { createAdminUser } from '../controllers/internal_controller';
import { internalAuth } from '../middleware/internalAuth';

const router = Router();

router.post('/admin', internalAuth, createAdminUser);

export default router;
