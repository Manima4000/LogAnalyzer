import { Request, Response, NextFunction } from 'express';
import { createAndProcessLog, getAllLogs, getMineLogs } from '../services/logService';
import Log from '../models/Logs';
import { Op } from 'sequelize';
import { getUserIdFromToken } from '../services/tokenService';


export const ingestLog = async (req: Request, res: Response): Promise<void> => {
  const { source, timestamp, message, severity } = req.body;
  if (!source || !timestamp || !message || !severity) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    return;
  }
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if(!token) throw new Error('Token não fornecido')
  const userId = getUserIdFromToken(token)

  try {
    const log = await createAndProcessLog({
      source,
      timestamp: new Date(timestamp),
      message,
      severity,
      userId: userId
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ingerir log' });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try{
    const logs = await getAllLogs();
    res.status(200).json(logs)
  } catch (error){
    console.error('Erro ao buscar Logs')
    res.status(500).json({error: 'Erro ao buscar logs'})
  }
}

export const getMyLogs = async(req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token){
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }
  const userId = getUserIdFromToken(token)
  if (!userId){
    res.status(400).json({ error: 'Erro ao buscar userId' });
    return;
  }
  try{
    const myLogs = await getMineLogs(userId);
    res.status(200).json(myLogs)
  } catch(error){
    res.status(500).json({error: 'Erro as buscar seus logs'})
  }
}
