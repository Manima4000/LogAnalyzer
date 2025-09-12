import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { createAndProcessLog } from '../services/logService';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role: 'analyst' });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Credenciais obrigatórias' });
    return;
  }
  
  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      await createAndProcessLog({
        source: 'auth',
        timestamp: new Date(),
        message: `Tentativa de login falha para usuário: ${username}`,
        severity: 'warning',
        userId: user?.id
      });
      res.status(401).json({ error: 'Usuário ou senha inválidos' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    await createAndProcessLog({
      source: 'auth',
      timestamp: new Date(),
      message: `Login realizado com sucesso: ${username}`,
      severity: 'info',
      userId: user.id
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
