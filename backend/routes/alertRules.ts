// routes/alertRules.ts
import { Router } from 'express';
import {
  listAlertRules,
  createRule,
  editRule,
  removeRule
} from '../controllers/alertRules_controller';
import { authenticateToken } from '../middleware/auth';
import { authorize } from '../middleware/authorizeRoles';

const router = Router();

router.use(authenticateToken, authorize(['admin']));

router.get('/', listAlertRules);
router.post('/create', createRule);
router.patch('/:id', editRule);
router.delete('/:id', removeRule);

export default router;