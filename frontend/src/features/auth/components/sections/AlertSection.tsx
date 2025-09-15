import { useEffect, useState } from 'react';
import { fetchAlerts } from '../../services/alertService';

export default function AlertsSection({ token }: { token: string }) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts(token)
      .then(setAlerts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="bg-white/10 p-6 rounded-lg border border-white/20 shadow">
      <h2 className="text-xl font-semibold text-blue-200 mb-4">Alertas de Segurança</h2>
      {loading ? (
        <p className="text-white/80">Carregando...</p>
      ) : alerts.length === 0 ? (
        <p className="text-white/60">Nenhum alerta ativo.</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, i) => (
            <li key={i} className="text-white/80 border-b border-white/20 pb-2">
              <strong>{alert.createdAt}</strong> — {alert.message}
              <span className="ml-2 text-sm text-red-400">[{alert.severity}]</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
