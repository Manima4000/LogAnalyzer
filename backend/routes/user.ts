import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { authorize } from "../middleware/authorizeRoles";
import { getAllUsers } from "../controllers/user_controller";

const router = Router();

router.get('/all',authenticateToken,authorize(['admin']), getAllUsers);

export default router;