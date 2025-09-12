import Alert from '../models/Alert';
import Log from '../models/Logs';
import { getAlertRules } from './alertRulesStore';

// const alertRules: AlertRule[] = [
//     {
//         condition: (log) => 
//             log.severity === 'critical' && log.message.toLowerCase().includes('acesso não autorizado'),
//         type: 'Unauthorized Access',
//         message: (log) => `Acesso não autorizado detectado na fonte ${log.source} às ${log.timestamp}`,
//         severity: 'high'
//     },
//     {
//         condition: (log) => 
//             log.source === 'firewall' && log.message.toLowerCase().includes('port scan'),
//         type: 'Port Scan',
//         message: (log) => `Possivel port scan detectado: ${log.message}`,
//         severity: 'medium'
//     },
//     {
//         condition: (log) =>
//             log.source === 'auth' &&
//             log.severity === 'critical' &&
//             log.message.includes('Entradas suspeitas detectadas'),
//         type: 'Field Injection Attempt',
//         message: (log) => `Tentativa de injeção nos campos de login: ${log.message}`,
//         severity: 'high'
//     },
  
//     //Lugar para adiocionar mais regras para gerar alertas
// ]

export const evaluateLogForAlerts = async (log: Log): Promise<void> => {
  const rules = await getAlertRules();

  for (const rule of rules) {
    const matchesSource = rule.matchSource ? log.source === rule.matchSource : true;
    const matchesSeverity = rule.matchSeverity ? log.severity === rule.matchSeverity : true;
    const containsMessage = rule.containsMessage
      ? log.message.toLowerCase().includes(rule.containsMessage.toLowerCase())
      : true;

    if (matchesSource && matchesSeverity && containsMessage) {
      await Alert.create({
        type: rule.type,
        message: `Alerta gerado: ${rule.type} - ${log.message}`,
        severity: rule.severity,
        logId: log.id
      });
    }
  }
};

