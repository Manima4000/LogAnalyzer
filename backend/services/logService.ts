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