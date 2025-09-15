import { useEffect, useState } from 'react';
import { fetchServices } from '../../services/honeypotService';
import { connectToService } from '../../services/honeypotService';

export default function ServicesSection({ token }: { token: string }) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingPort, setConnectingPort] = useState<number | null>(null)

  useEffect(() => {
    fetchServices(token)
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const handleConnect = async (port:number) => {
    setConnectingPort(port);
    try{
      await connectToService(token,port)
      alert(`Conexão simulada com o serviço na porta ${port}`)
    } catch(error: any){
      alert(`Erro: ${error.message}`)
    } finally {
      setConnectingPort(null)
    }
  }

  return (
    <div className="bg-white/10 p-6 rounded-lg border border-white/20 shadow">
      <h2 className="text-xl font-semibold text-blue-200 mb-4">Serviços em execução</h2>
      {loading ? (
        <p className="text-white/80">Carregando...</p>
      ) : (
        <ul className="space-y-3">
          {services.map((s, i) => (
            <li key={i} className="text-white/80 border-b border-white/20 pb-2 flex justify-between items-center">
              <div>
                {s.banner} – Porta {s.port} – Status:{' '}
                <span className={s.enabled ? 'text-green-400' : 'text-red-400'}>
                  {s.enabled ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              {s.enabled && (
                <button
                  onClick={() => handleConnect(s.port)}
                  disabled={connectingPort === s.port}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition text-white"
                >
                  {connectingPort === s.port ? 'Conectando...' : 'Conectar'}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
