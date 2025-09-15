import { Request, Response } from 'express';
import HoneypotConfig from '../models/HoneypotConfig';
import { getAllHoneypots, handleHoneypotInteraction } from '../services/honeypotManager';
import { getUserIdFromToken } from '../services/tokenService';

export const simulateHoneypotInteraction = async (req: Request, res: Response) => {
  const port = parseInt(req.params.port);
  const config = await HoneypotConfig.findOne({ where: { port } });

  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if(!token) throw new Error('Token invadilo ou expirado')
  const userId = getUserIdFromToken(token);

  if (!config || !config.enabled) {
    return res.status(404).json({ message: `Honeypot na porta ${port} não encontrado ou desativado.` });
  }
  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  await handleHoneypotInteraction(userId, port);

  res.status(200).json({ message: `Interação simulada na porta ${port}.` });
};

export const getHoneypot = async (req: Request, res: Response) => {
  try {
    const honeypots = await getAllHoneypots();
    res.status(200).json(honeypots)
  } catch(error){
    console.error('Erro ao listar honeypots: ', error)
    res.status(500).json({error: 'Erro ao buscar honeypots'})
  }
}