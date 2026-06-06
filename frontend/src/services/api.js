function handleApiError(error, defaultMessage) {
    console.error(defaultMessage, error);

    if (error.message === 'Failed to fetch') {
        alert('⚠️ Backend is not running. Please run: cd backend && fastapi dev');
    } else if (error.status === 401) {
        alert('⚠️ Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
        window.location.href = '/login';
    } else if (error.status === 404) {
        alert('⚠️ Resource not found. Please check your request.');
    } else {
        alert(`⚠️ ${defaultMessage}: ${error.message}`);
    }
}

export async function login(email, password) {
    const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
    }
    return response.json();
}

export async function register(email, password) {
    const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
    }
    return response.json();
}

export async function fetchSessions() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://localhost:8000/sessions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            handleApiError({ status: 401 }, 'Session expired');
            throw new Error('Session expired');
        }
        return response.json();
    } catch (error) {
        handleApiError(error, 'Failed to fetch sessions');
        throw error;
    }
}

export async function createSession(sessionData) {
    const token = localStorage.getItem('authToken');

    try {

        const response = await fetch('http://localhost:8000/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sessionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
    } catch (error) {
        handleApiError(error, 'Failed to save session');
        throw error;
    }
}

export async function getCurrentUser() {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:8000/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
        window.location.href = '/login';
        throw new Error('Session expired');
    }
    return response.json();
}
