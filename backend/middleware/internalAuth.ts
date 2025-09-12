import { Request, Response, NextFunction } from 'express';

export const internalAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-internal-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};
