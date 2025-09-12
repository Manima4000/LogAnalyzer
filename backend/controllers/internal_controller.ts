import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { createAndProcessLog } from '../services/logService';

export const createAdminUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username e senha são obrigatórios' });
    return;
  }

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      res.status(409).json({ error: 'Usuário já existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role: 'admin' });

    await createAndProcessLog({
      source: 'internal',
      timestamp: new Date(),
      message: `Usuário admin criado: ${username}`,
      severity: 'info',
      userId: user.id
    });

    res.status(201).json({ message: 'Admin criado com sucesso', userId: user.id });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário admin' });
  }
};
