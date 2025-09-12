import { Request, Response } from 'express';
import HoneypotConfig from '../models/HoneypotConfig';
import { handleHoneypotInteraction } from '../services/honeypotManager';

export const simulateHoneypotInteraction = async (req: Request, res: Response) => {
  const port = parseInt(req.params.port);
  const config = await HoneypotConfig.findOne({ where: { port } });

  if (!config || !config.enabled) {
    return res.status(404).json({ message: `Honeypot na porta ${port} não encontrado ou desativado.` });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  await handleHoneypotInteraction(userId, port);

  res.status(200).json({ message: `Interação simulada na porta ${port}.` });
};