import { Request, Response, NextFunction } from 'express';
import { createAndProcessLog } from '../services/logService';
import Log from '../models/Logs';
import { Op } from 'sequelize';


export const ingestLog = async (req: Request, res: Response): Promise<void> => {
  const { source, timestamp, message, severity } = req.body;
  if (!source || !timestamp || !message || !severity) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    return;
  }

  try {
    const log = await createAndProcessLog({
      source,
      timestamp: new Date(timestamp),
      message,
      severity,
      userId: req.user?.id
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ingerir log' });
  }
};

export const getLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // paginação e filtros via query params
    const page     = Math.max(Number(req.query.page)  || 1,   1);
    const limit    = Math.min(Number(req.query.limit) || 20, 100);
    const offset   = (page - 1) * limit;
    const {
      severity,    // info | warning | critical
      source,      // string
      userId,      // numeric
      startDate,   // ISO string
      endDate,     // ISO string
      keyword      // mensagem parcial
    } = req.query as Record<string, string>;

    // monta cláusula WHERE dinamicamente
    const where: any = {};
    if (severity) {
      where.severity = severity;
    }
    if (source) {
      where.source = { [Op.iLike]: `%${source}%` };
    }
    if (userId) {
      where.userId = Number(userId);
    }
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) {
        where.timestamp[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        where.timestamp[Op.lte] = new Date(endDate);
      }
    }
    if (keyword) {
      where.message = { [Op.iLike]: `%${keyword}%` };
    }

    // busca paginada e ordenada
    const { rows: data, count: total } = await Log.findAndCountAll({
      where,
      order: [['timestamp', 'DESC']],
      limit,
      offset,
      attributes: ['id', 'source', 'timestamp', 'message', 'severity', 'userId']
    });

    // constrói metadados de paginação
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      data,
      pagination: {
        total,
        pages,
        page,
        limit
      }
    });
  } catch (err) {
    next(err);
  }
};
