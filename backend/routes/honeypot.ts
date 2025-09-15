import { Router } from "express";
import { activateHoneypot, desactivateHoneypot } from "../controllers/honeypot_admin_controller";
import { authenticateToken } from "../middleware/auth";
import { authorize } from "../middleware/authorizeRoles";
import { getHoneypot, simulateHoneypotInteraction } from "../controllers/honeypot_controller";

const router = Router();

router.use(authenticateToken);

router.post('/interact/:port', authorize(['analyst', 'admin']), simulateHoneypotInteraction);
router.patch('/activate/:port', authorize(['admin']), activateHoneypot);
router.patch('/desactivate/:port', authorize(['admin']), desactivateHoneypot);
router.get('/all',authorize(['analyst', 'admin']),getHoneypot)


export default router;