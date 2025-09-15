import net from 'net';
import HoneypotConfig from '../models/HoneypotConfig';
import { createAndProcessLog } from './logService';

const activeServers: Record<number, net.Server> = {};

export async function initializeHoneypot(port: number, userId: number) {
  const config = await HoneypotConfig.findOne({ where: { port } });
  if (!config || !config.enabled) {
    throw new Error(`Honeypot na porta ${port} não está habilitado ou não existe.`);
  }

  if (activeServers[port]) {
    throw new Error(`Honeypot na porta ${port} já está em execução.`);
  }

  const server = net.createServer(socket => {
    socket.write(config.banner || `Simulação ativa na porta ${port}\r\n`);
    socket.end();
  });

  server.on('error', (err) => {
  console.error(`❌ Erro ao iniciar honeypot na porta ${port}:`, err);
  });


  server.listen(port, async () => {
    activeServers[port] = server;

    await createAndProcessLog({
      source: `Honeypot:${port}`,
      timestamp: new Date(),
      message: `Honeypot iniciado na porta ${port}`,
      severity: 'info',
      userId: userId
    });

    console.log(`✅ Honeypot escutando na porta ${port}`);
  });
}


export async function handleHoneypotInteraction(userId: number, port: number) {
  const config = await HoneypotConfig.findOne({ where: { port } });
  if (!config || !config.enabled) {
    throw new Error(`Honeypot na porta ${port} não está habilitado ou não existe.`);
  }

  await createAndProcessLog({
    source: `Honeypot:${port}`,
    timestamp: new Date(),
    message: `Conexão simulada na porta ${port} pelo usuário ${userId}`,
    severity: 'info',
    userId: userId
  });
}

export async function terminateHoneypot(port: number, userId: number) {
  const server = activeServers[port];

  if (!server) {
    console.warn(`⚠️ Honeypot na porta ${port} já não estava em execução.`);
    
    await createAndProcessLog({
      source: `Honeypot:${port}`,
      timestamp: new Date(),
      message: `Tentativa de encerramento na porta ${port}, mas já não estava ativo.`,
      severity: 'info',
      userId: userId
    });

    return; 
  }

  server.close(() => {
    delete activeServers[port];
    console.log(`🛑 Honeypot encerrado na porta ${port}`);
  });

  await createAndProcessLog({
    source: `Honeypot:${port}`,
    timestamp: new Date(),
    message: `Honeypot encerrado na porta ${port} pelo usuário ${userId}`,
    severity: 'info',
    userId
  });
}


export async function startAllHoneypots(userId: number) {
  const configs = await HoneypotConfig.findAll({ where: { enabled: true } });
  for (const config of configs) {
    await initializeHoneypot(config.port, userId);
  }
}

export async function getAllHoneypots(): Promise<HoneypotConfig[]> {
  try {
    const honeypots = await HoneypotConfig.findAll()
    return honeypots;
  } catch (error) {
    console.error('Erro ao buscar honeypots:', error);
    return [];
  }
}
