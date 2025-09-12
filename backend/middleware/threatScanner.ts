import { Request, Response, NextFunction } from "express";
import { detectors } from "../utils/securityDetectors";
import { createAndProcessLog } from "../services/logService";

export function threatScanner(fields: (keyof Request['body'])[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const issues: string[] = [];

    fields.forEach(field => {
      const value = String(req.body[field] || '');
      detectors.forEach(detector => {
        if (detector.detect(value)) {
          issues.push(`Detector: ${detector.name} - ${detector.description}`);
        }
      });
    });

    if (issues.length) {
      try {
        await createAndProcessLog({
          source: 'auth',
          timestamp: new Date(),
          message: `Entradas suspeitas detectadas: ${issues.join('; ')}`,
          severity: 'critical',
          userId: req.user?.id
        });
      } catch {
        return res.status(500).json({ error: 'Falha ao registrar log' });
      }

      return res.status(400).json({ error: 'Entradas suspeitas detectadas', details: issues });
    }

    next();
  };
}
