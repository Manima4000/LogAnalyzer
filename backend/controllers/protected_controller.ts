import { Request, Response } from 'express';

export const dashboard = async (req: Request, res: Response) => {
  res.json({ message: `Bem-vindo, usuário ${req.user?.id} com papel ${req.user?.role}` });
};

