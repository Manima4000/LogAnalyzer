// services/logService.ts
import Log from '../models/Logs';
import { evaluateLogForAlerts } from './alertEngine';
import { LogCreationAttributes } from '../models/Logs';

export async function createAndProcessLog(params: LogCreationAttributes) 
{
  const { source, timestamp, message, severity, userId } = params;
  const log = await Log.create({ source, timestamp, message, severity, userId });
  await evaluateLogForAlerts(log);
  return log;
}

export async function getAllLogs(): Promise<Log[]>{
  try{
    const logs = await Log.findAll();
    return logs
  } catch(error){
    throw new Error("Erro ao buscar logs")
  }
}

export async function getMineLogs(userId: number): Promise<Log[]>{
  try{
    const myLogs = await Log.findAll({where: {userId: userId}})
    return myLogs
  } catch(error){
    throw new Error("Erro ao buscar logs")
  }
}