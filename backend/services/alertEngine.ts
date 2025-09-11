import Alert from '../models/Alert';
import Log from '../models/Logs';

interface AlertRule{
    condition: (log: Log) => boolean;
    type: string;
    message: (log: Log) => string;
    severity: 'low' | 'medium' | 'high';
}

const alertRules: AlertRule[] = [
    {
        condition: (log) => 
            log.severity === 'critical' && log.message.toLowerCase().includes('acesso não autorizado'),
        type: 'Unauthorized Access',
        message: (log) => `Acesso não autorizado detectado na fonte ${log.source} às ${log.timestamp}`,
        severity: 'high'
    },
    {
        condition: (log) => 
            log.source === 'firewall' && log.message.toLowerCase().includes('port scan'),
        type: 'Port Scan',
        message: (log) => `Possivel port scan detectado: ${log.message}`,
        severity: 'medium'
    },
    {
        condition: (log) =>
            log.source === 'auth' &&
            log.severity === 'critical' &&
            log.message.includes('SQL Injection'),
        type: 'SQL Injection',
        message: (log) => `Tentativa de SQL Injection detectada: ${log.message}`,
        severity: 'high'
    },
  
    //Lugar para adiocionar mais regras para gerar alertas
]

export const evaluateLogForAlerts = async (log: Log): Promise<void> => {
    for (const rule of alertRules){
        if (rule.condition(log)){
            await Alert.create({
                type: rule.type,
                message: rule.message(log),
                severity: rule.severity,
                logId: log.id
            });
        }
    }
}