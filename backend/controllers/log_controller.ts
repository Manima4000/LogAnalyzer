import { Request, Response } from "express";
import Log from "../models/Logs";
import { evaluateLogForAlerts } from "../services/alertEngine";

export const ingestLog = async (req: Request, res: Response): Promise<void> => {
    const { source, timestamp, message, severity } = req.body;

    if (!source || !timestamp || !message || !severity) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
    }

    try{
        const log = await Log.create({ source, timestamp, message, severity, userId: req.user?.id });
        await evaluateLogForAlerts(log);
        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao ingerir log' });
    }
};