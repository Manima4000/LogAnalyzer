import { useEffect, useState } from 'react';
import {  startHoneypot, stopHoneypot } from '../../services/manageService';
import { fetchServices } from '../../services/honeypotService';

export default function ManageServicesSection({ token }: { token: string }) {
  const [honeypots, setHoneypots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHoneypots = async () => {
    setRefreshing(true);
    try {
      const data = await fetchServices(token);
      setHoneypots(data);
    } catch (err) {
      console.error('Erro ao carregar honeypots:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHoneypots().finally(() => setLoading(false));
  }, [token]);

  const handleStart = async (port: number) => {
    await startHoneypot(token, port);
    loadHoneypots();
  };

  const handleStop = async (port: number) => {
    await stopHoneypot(token, port);
    loadHoneypots();
  };


  return (
    <div className="bg-white/10 p-6 rounded-lg border border-white/20 shadow text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-200">Gerenciar Honeypots</h2>
      </div>

      {loading ? (
        <p className="text-white/80">Carregando...</p>
      ) : honeypots.length === 0 ? (
        <p className="text-white/60">Nenhum honeypot configurado.</p>
      ) : (
        <ul className="space-y-3">
          {honeypots.map((hp) => (
            <li
              key={hp.port}
              className="flex justify-between items-center border-b border-white/20 pb-2"
            >
              <div>
                <strong>{hp.banner}</strong> — Porta {hp.port} —{' '}
                <span className={hp.enabled ? 'text-green-400' : 'text-red-400'}>
                  {hp.enabled ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="space-x-2">
                {hp.enabled ? (
                  <button
                    onClick={() => handleStop(hp.port)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Encerrar
                  </button>
                ) : (
                  <button
                    onClick={() => handleStart(hp.port)}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                  >
                    Iniciar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}