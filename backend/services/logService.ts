// services/logService.ts
import Log from '../models/Logs';
import { evaluateLogForAlerts } from './alertEngine';

export async function createAndProcessLog(params: {
  source: string;
  timestamp: Date;
  message: string;
  severity: 'info' | 'critical';
  userId?: number;
}) 
{
  const { source, timestamp, message, severity, userId } = params;
  const log = await Log.create({ source, timestamp, message, severity, userId });
  await evaluateLogForAlerts(log);
  return log;
}