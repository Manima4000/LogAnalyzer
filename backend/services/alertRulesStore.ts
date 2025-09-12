// services/alertRulesService.ts
import AlertRule from '../models/AlertRules';
import type { AlertRuleCreationAttributes } from '../models/AlertRules';

export async function getAlertRules() {
  return await AlertRule.findAll();
}

export async function createAlertRule(data: AlertRuleCreationAttributes) {
  return await AlertRule.create(data);
}

export async function updateAlertRule(id: string, updates: Partial<AlertRule>) {
  const rule = await AlertRule.findByPk(id);
  if (!rule) return null;
  await rule.update(updates);
  return rule;
}

export async function deleteAlertRule(id: string) {
  const rule = await AlertRule.findByPk(id);
  if (!rule) return false;
  await rule.destroy();
  return true;
}