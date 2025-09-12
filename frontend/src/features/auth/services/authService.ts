export async function loginUser(data: { username: string; password: string }) {
    try{
        const response = await fetch('http://localhost:4000' + '/api/auth/login', {
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