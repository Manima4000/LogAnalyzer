import net from 'net';
import HoneypotConfig from '../models/HoneypotConfig';
import { createAndProcessLog } from './logService';

const activeServers: Record<number, net.Server> = {};

/**
 * Inicializa honeypot em uma porta específica
 */
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
      userId
    });

    console.log(`✅ Honeypot escutando na porta ${port}`);
  });
}

/**
 * Registra interação de usuário com honeypot
 */
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
    userId
  });
}

/**
 * Encerra honeypot em uma porta específica
 */
export async function terminateHoneypot(port: number, userId: number) {
  const server = activeServers[port];

  if (!server) {
    console.warn(`⚠️ Honeypot na porta ${port} já não estava em execução.`);
    
    await createAndProcessLog({
      source: `Honeypot:${port}`,
      timestamp: new Date(),
      message: `Tentativa de encerramento na porta ${port}, mas já não estava ativo.`,
      severity: 'info',
      userId
    });

    return; // 👈 Não lança erro, apenas sai
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


/**
 * Inicializa todos honeypots ativos no banco
 */
export async function startAllHoneypots(userId: number) {
  const configs = await HoneypotConfig.findAll({ where: { enabled: true } });
  for (const config of configs) {
    await initializeHoneypot(config.port, userId);
  }
}