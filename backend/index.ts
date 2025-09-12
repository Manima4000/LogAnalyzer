import express from 'express';
import { setupSwagger } from './config/swagger';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import logRoutes from './routes/log';
import alertRoutes from './routes/alert';
import userRoutes from './routes/user';
import internalRouts from './routes/internal';
import alertRuleRoutes from './routes/alertRules';
import honeypotRouter from './routes/honeypot';
import { setup } from 'swagger-ui-express';
import { setupHoneypots } from './scripts/initHoneypots';
import User from './models/User';
import HoneypotConfig from './models/HoneypotConfig';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);

const adminUserId = parseInt(process.env.ADMIN_ID ?? '1');

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao PostgreSQL');

    await sequelize.sync({ alter: true });
    console.log('📦 Tabelas sincronizadas');

    const honeypotCount = await HoneypotConfig.count();
    if (honeypotCount === 0) {
      console.log('🔧 Nenhum honeypot configurado. Executando setup inicial...');
      await setupHoneypots(adminUserId);
    } else {
      console.log(`✅ ${honeypotCount} honeypots já configurados. Pulando setup inicial.`);
    }


    app.use('/api/auth', authRoutes);
    app.use('/api/logs', logRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/alerts', alertRoutes);
    app.use('/api/alert-rules', alertRuleRoutes);
    app.use('/internal', internalRouts);
    app.use('/api/honeypot', honeypotRouter);

    app.get('/', (req, res) => {
      res.send('Servidor está ativo!');
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error('❌ Erro ao iniciar o servidor:', err);
  }
}

startServer();