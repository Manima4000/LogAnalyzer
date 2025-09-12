import { Request, Response, NextFunction } from "express";
import { detectors } from "../utils/securityDetectors";
import { createAndProcessLog } from "../services/logService";

export function theatScanner(fields: (keyof Request['body'])[]){
    return async (req: Request, res: Response, next: NextFunction) => {
        const issues: string[] = [];

        //Basicamente aqui estamos varrendo cada campo (username, password) e rodando todos os detectores
        fields.forEach(field => {
            const value = String(req.body[field] || '');
            detectors.forEach(detector => {
                if (detector.detect(value)){
                    issues.push(`Detector: ${detector.name} - ${detector.description}`);
                }
            });
        });
        
        const severity = issues.length ? 'critical' : 'info';
        const message = issues.length ? `Entradas suspeitas detectadas: ${issues.join('; ')}` : `Login realizado: ${req.body.username}`;

        try {
            await createAndProcessLog({
                source: 'auth',
                timestamp: new Date(),
                message,
                severity,
                userId: req.user?.id
            });
            } catch {
            return res.status(500).json({ error: 'Falha ao registrar log' });
        }


        if (issues.length){
            res.status(400).json({ error: 'Entradas suspeitas detectadas', details: issues });
            return;
        }

        next();
        
    }
}