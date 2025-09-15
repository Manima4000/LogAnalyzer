export const API_URL_BACK = import.meta.env.VITE_API_URL_BACK;

export async function loginUser(data: { username: string; password: string }) {
    try{
        const response = await fetch(API_URL_BACK + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to login');
        }
        console.log('Login successful:', result);
        localStorage.setItem('token', result.token);
        return true;

    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

export async function registerUser(data: { username: string; password: string }) {
    try{
        const response = await fetch(API_URL_BACK + '/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to register');
        }
        console.log('Registration successful:', result);
        return true;
    } catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
}

export async function getUsernameFromToken(token: string): Promise<string | null> {
    if (!token) return null;
    const response = await fetch(API_URL_BACK+'/api/auth/verify-username', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify({ token }),
    })
    const result = await response.json();
    if (!response.ok) {
        console.error('Failed to get username:', result.message || 'Unknown error');
        return null;
    }
    console.log('Username retrieval successful:', result);
    return result.username;
}