import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { dashboard } from '../controllers/protected_controller';

const router = Router();

router.get('/dashboard', authenticateToken, dashboard)

export default router;
