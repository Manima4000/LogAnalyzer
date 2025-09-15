import { roleVerification } from "./roleVerification";

const API_URL_BACK = import.meta.env.VITE_API_URL_BACK;

export async function fetchAlerts(token: string) {
  const role = await roleVerification(token)
  if (role !== 'admin') throw new Error('Acesso negado')
  const res = await fetch(`${API_URL_BACK}/api/alerts/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao buscar alertas');
  return res.json(); // retorna lista de alertas
}
