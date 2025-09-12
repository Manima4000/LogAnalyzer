// routes/alertRules.ts
import { Router } from 'express';
import {
  listAlertRules,
  createAlertRule,
  editAlertRule,
  removeAlertRule
} from '../controllers/alertRules_controller';
import { authenticateToken } from '../middleware/auth';
import { authorize } from '../middleware/authorizeRoles';

const router = Router();

router.use(authenticateToken, authorize(['admin']));

router.get('/', listAlertRules);
router.post('/', createAlertRule);
router.patch('/:id', editAlertRule);
router.delete('/:id', removeAlertRule);

export default router;