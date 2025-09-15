const API_URL_BACK = import.meta.env.VITE_API_URL_BACK;

export async function fetchServices(token: string){
    const response = await fetch(API_URL_BACK + "/api/honeypot/all", {
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!response.ok) throw new Error('Erro ao buscar honeypots')
    return response.json()
}

export async function connectToService(token: string, port: number){
    const res = await fetch(API_URL_BACK + `/api/honeypot/interact/${port}`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`}
    });

    if (!res.ok){
        const error = await res.json();
        throw new Error(error.message || 'Erro ao conectar ao servidor');
    }

    return await res.json();
}