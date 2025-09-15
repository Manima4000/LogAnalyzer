import { useEffect, useState } from 'react';
import { fetchMyLogs } from '../../services/logService';

interface Props {
  token: string;
  role: 'admin' | 'analyst';
}

export default function LogsSection({ token, role }: Props) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLogs(token)
      .then(setLogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, role]);

  return (
    <div className="bg-white/10 p-6 rounded-lg border border-white/20 shadow">
      <h2 className="text-xl font-semibold text-blue-200 mb-4">
        Seus Logs
      </h2>
      {loading ? (
        <p className="text-white/80">Carregando...</p>
      ) : logs.length === 0 ? (
        <p className="text-white/60">Nenhum log encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log, i) => (
            <li key={i} className="text-white/80 border-b border-white/20 pb-2">
              <strong>{log.timestamp}</strong> — {log.message}  
              <span className="ml-2 text-sm text-blue-300">[{log.severity}]</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
