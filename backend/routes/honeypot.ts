import { Router } from "express";
import { activateHoneypot, desactivateHoneypot } from "../controllers/honeypot_admin_controller";
import { authenticateToken } from "../middleware/auth";
import { authorize } from "../middleware/authorizeRoles";
import { simulateHoneypotInteraction } from "../controllers/honeypot_interation_controller";

const router = Router();

router.use(authenticateToken);

router.post('/interact/:port', authorize(['analyst', 'admin']), simulateHoneypotInteraction);
router.patch('/activate/:port', authorize(['admin']), activateHoneypot);
router.patch('/desactivate/:port', authorize(['admin']), desactivateHoneypot);


export default router;