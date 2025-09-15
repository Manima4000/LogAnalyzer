//import { roleVerification } from "./roleVerification";
const API_URL_BACK = import.meta.env.VITE_API_URL_BACK;

export async function fetchMyLogs(token:string){
    const endpoint = '/api/logs/myLogs'
    const response = await fetch(API_URL_BACK+endpoint, {
        headers: {Authorization: `Bearer ${token}`}
    })
    if (!response.ok) throw new Error("Erro ao buscar logs")
    return response.json()
}