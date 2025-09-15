import { Request, Response } from 'express';
import HoneypotConfig from '../models/HoneypotConfig';
import { initializeHoneypot, terminateHoneypot } from '../services/honeypotManager';
import { getUserIdFromToken } from '../services/tokenService';

export const activateHoneypot = async (req: Request, res: Response) => {
  const port = parseInt(req.params.port);

  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if(!token) throw new Error('Token invalido ou expirado')

  const userId = getUserIdFromToken(token)

  const config = await HoneypotConfig.findByPk(port);
  if (!config) return res.status(404).json({ error: 'Porta não encontrada' });

  await config.update({ enabled: true });
  await initializeHoneypot(port, userId);

  res.status(200).json({ message: `Honeypot ativado na porta ${port}` });
};

export const desactivateHoneypot = async (req: Request, res: Response) => {
  const port = parseInt(req.params.port);
  
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if(!token) throw new Error('Token invalido ou expirado')

  const userId = getUserIdFromToken(token)

  const config = await HoneypotConfig.findByPk(port);
  if (!config) return res.status(404).json({ error: 'Porta não encontrada' });

  await config.update({ enabled: false });
  await terminateHoneypot(port, userId);

  res.status(200).json({ message: `Honeypot desativado na porta ${port}` });
};