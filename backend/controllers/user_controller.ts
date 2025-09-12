// controllers/user_controller.ts
import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import User from '../models/User';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = (page - 1) * limit;

    const where: any = {};
    if (req.query.username) {
      where.username = { [Op.iLike]: `%${req.query.username}%` };
    }
    if (req.query.role) {
      where.role = req.query.role;
    }

    const { rows: users, count: total } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit,
      offset,
      order: [['username', 'ASC']],
    });

    const pages = Math.ceil(total / limit);

    res.status(200).json({
      data: users,
      pagination: { total, pages, page, limit }
    });
  } catch (err) {
    next(err);
  }
};
