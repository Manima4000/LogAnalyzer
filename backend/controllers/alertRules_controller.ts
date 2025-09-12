// controllers/alertRules_controller.ts
import { Request, Response } from 'express';
import {
  getAlertRules,
  createAlertRule,
  updateAlertRule,
  deleteAlertRule
} from '../services/alertRulesStore';

export const listAlertRules = async (req: Request, res: Response) => {
  const rules = await getAlertRules();
  res.json(rules);
};

export const createRule = async (req: Request, res: Response) => {
  const { type, severity, matchSource, matchSeverity, containsMessage } = req.body;
  if (!type || !severity) {
    return res.status(400).json({ error: 'Campos obrigatórios: type, severity' });
  }

  const rule = await createAlertRule({ type, severity, matchSource, matchSeverity, containsMessage });
  res.status(201).json(rule);
};

export const editRule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const rule = await updateAlertRule(id, updates);
  if (!rule) return res.status(404).json({ error: 'Regra não encontrada' });
  res.json(rule);
};

export const removeRule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await deleteAlertRule(id);
  if (!success) return res.status(404).json({ error: 'Regra não encontrada' });
  res.json({ message: 'Regra removida com sucesso' });
};