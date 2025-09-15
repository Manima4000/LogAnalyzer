import { roleVerification } from "./roleVerification";

export const API_URL_BACK = import.meta.env.VITE_API_URL_BACK;
const BASE = API_URL_BACK + '/api/honeypot'

export async function startHoneypot(token: string, port: number) {
  const role = await roleVerification(token)
  if (role !== 'admin') throw new Error('Acesso negado')

  const res = await fetch(`${BASE}/activate/${port}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao iniciar honeypot');
}

export async function stopHoneypot(token: string, port: number) {
  const role = await roleVerification(token)
  if (role !== 'admin') throw new Error('Acesso negado')
    
  const res = await fetch(`${BASE}/desactivate/${port}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao encerrar honeypot');
}

