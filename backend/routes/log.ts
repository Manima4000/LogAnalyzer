import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getLogs, ingestLog } from '../controllers/log_controller';
import { authorize } from '../middleware/authorizeRoles';

const router = Router();

router.post('/create-log', authenticateToken, authorize(['admin','analyst']),ingestLog)

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Ingestão e visualização de logs
 */

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Registra um novo log no sistema
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - source
 *               - timestamp
 *               - message
 *               - severity
 *             properties:
 *               source:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               message:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [info, warning, critical]
 *     responses:
 *       201:
 *         description: Log registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 */

router.get('/list', authenticateToken, authorize(['admin','analyst']), getLogs);

export default router;