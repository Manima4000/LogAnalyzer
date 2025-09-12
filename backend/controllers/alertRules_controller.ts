// controllers/alertRules_controller.ts
import { Request, Response } from 'express';
import {
  getAlertRules,
  addAlertRule,
  updateAlertRule,
  deleteAlertRule
} from '../services/alertRulesStore';
import { v4 as uuidv4 } from 'uuid';

export const listAlertRules = (req: Request, res: Response) => {
  res.json(getAlertRules());
};

export const createAlertRule = (req: Request, res: Response) => {
  const { type, severity, matchSource, matchSeverity, containsMessage } = req.body;

  if (!type || !severity) {
    return res.status(400).json({ error: 'Campos obrigatórios: type, severity' });
  }

  const newRule = {
    id: uuidv4(),
    type,
    severity,
    matchSource,
    matchSeverity,
    containsMessage
  };

  addAlertRule(newRule);
  res.status(201).json(newRule);
};

export const editAlertRule = (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const success = updateAlertRule(id, updates);
  if (!success) return res.status(404).json({ error: 'Regra não encontrada' });

  res.json({ message: 'Regra atualizada com sucesso' });
};

export const removeAlertRule = (req: Request, res: Response) => {
  const { id } = req.params;

  const success = deleteAlertRule(id);
  if (!success) return res.status(404).json({ error: 'Regra não encontrada' });

  res.json({ message: 'Regra removida com sucesso' });
};