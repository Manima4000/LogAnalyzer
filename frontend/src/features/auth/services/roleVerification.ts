export const API_URL_BACK = import.meta.env.VITE_API_URL_BACK;

export async function roleVerification(token: string | null): Promise<"admin" | "analyst" | undefined> {
    if (!token) return undefined;
    const response = await fetch(API_URL_BACK+'/api/auth/verify-role', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify({ token }),
    })
    const result = await response.json();
    if (!response.ok) {
        console.error('Failed to verify role:', result.message || 'Unknown error');
        return undefined;
    }
    console.log('Role verification successful:', result);
    return result.role;
}

