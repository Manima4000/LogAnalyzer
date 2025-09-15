import { Request, Response, NextFunction } from 'express';
import { getRoleFromToken } from '../services/tokenService';

export function authorize(roles: ('admin' | 'analyst')[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) throw new Error('Token invalido ou expirado')

    const userRole = getRoleFromToken(token,roles)
    
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
}
