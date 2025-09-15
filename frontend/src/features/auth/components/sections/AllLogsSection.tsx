import { useEffect, useState } from "react";
import { fetchAllLogs } from "../../services/logService";

interface Props{
    token:string;
}

export default function AllLogsSection({token}: Props) {
    const [allLogs, setAllLogs] = useState<any[]>([]);
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        fetchAllLogs(token)
            .then(setAllLogs)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [token]);

    return (
        <div className="bg-white/10 p-6 rounded-lg border border-white/20 shadow">
        <h2 className="text-xl font-semibold text-blue-200 mb-4">
            Seus Logs
        </h2>
        {loading ? (
            <p className="text-white/80">Carregando...</p>
        ) : allLogs.length === 0 ? (
            <p className="text-white/60">Nenhum log encontrado.</p>
        ) : (
            <ul className="space-y-2">
            {allLogs.map((log, i) => (
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
