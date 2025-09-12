import { Request, Response } from 'express';
import HoneypotConfig from '../models/HoneypotConfig';
import { initializeHoneypot, terminateHoneypot } from '../services/honeypotManager';

export const activateHoneypot = async (req: Request, res: Response) => {
  const port = parseInt(req.params.port);
  const banner = req.body.banner;
  if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado' });
  const userId = req.user.id;

  const config = await HoneypotConfig.findByPk(port);
  if (!config) return res.status(404).json({ error: 'Porta não encontrada' });

  await config.update({ enabled: true, banner });
  await initializeHoneypot(port, userId);

  res.json({ message: `Honeypot ativado na porta ${port}` });
};

export const desactivateHoneypot = async (req: Request, res: Response) => {
  const port = parseInt(req.params.port);
  if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado' });
  const userId = req.user.id;

  const config = await HoneypotConfig.findByPk(port);
  if (!config) return res.status(404).json({ error: 'Porta não encontrada' });

  await config.update({ enabled: false });
  await terminateHoneypot(port, userId);

  res.json({ message: `Honeypot desativado na porta ${port}` });
};