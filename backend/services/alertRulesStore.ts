export interface AlertRule {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  matchSource?: string;
  matchSeverity?: 'info' | 'warning' | 'critical';
  containsMessage?: string;
}

let alertRules: AlertRule[] = [];

export function getAlertRules(): AlertRule[] {
  return alertRules;
}

export function addAlertRule(rule: AlertRule): void {
  alertRules.push(rule);
}

export function updateAlertRule(id: string, updates: Partial<AlertRule>): boolean {
  const index = alertRules.findIndex(r => r.id === id);
  if (index === -1) return false;
  alertRules[index] = { ...alertRules[index], ...updates };
  return true;
}

export function deleteAlertRule(id: string): boolean {
  const index = alertRules.findIndex(r => r.id === id);
  if (index === -1) return false;
  alertRules.splice(index, 1);
  return true;
}