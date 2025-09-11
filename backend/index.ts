import express from 'express';
import { setupSwagger } from './config/swagger';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import User from './models/User';
import protectedRoutes from './routes/protected';
import logRoutes from './routes/log';
import alertRoutes from './routes/alert';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);


sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('📦 Tabelas sincronizadas'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));



app.use('/api/auth', authRoutes); //Registro e login
app.use('/api/protected', protectedRoutes); 
app.use('/api/logs', logRoutes);
app.use('/api/alerts', alertRoutes); 


app.get('/', (req, res) => {
  res.send('Servidor está ativo!');
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
