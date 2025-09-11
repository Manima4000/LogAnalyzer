import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { listAlerts } from '../controllers/alert_controller';

const router = Router();
router.get('/list', authenticateToken, listAlerts);

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Visualização de alertas gerados automaticamente
 */

/**
 * @swagger
 * /api/alerts/list:
 *   get:
 *     summary: Lista todos os alertas gerados
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, resolved]
 *         description: Filtrar por status
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filtrar por severidade
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrar por tipo de alerta
 *     responses:
 *       200:
 *         description: Lista de alertas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Token não fornecido ou inválido
 */

export default router;
