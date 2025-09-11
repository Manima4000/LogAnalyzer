import {Request, Response} from 'express';
import Alert from '../models/Alert';

export const listAlerts = async (req: Request, res: Response):Promise<void> => {
    try{
        const {status,severity, type} = req.query;
        const filters: any = {};
        if (status) filters.status = status;
        if (severity) filters.severity = severity;
        if (type) filters.type = type;

        const alerts = await Alert.findAll({where: filters, order: [['createdAt','DESC']]});

        res.json(alerts);
    } catch (err){
        res.status(500).json({error: 'Erro ao listar alertas'});
    }
}