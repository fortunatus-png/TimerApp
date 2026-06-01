function handleApiError(error, defaultMessage) {
    console.error(defaultMessage, error);

    if (error.message === 'Failed to fetch') {
        alert('⚠️ Backend is not running. Please run: cd backend && fastapi dev');
    } else if (error.response?.status === 401) {
        alert('⚠️ Session expired. Please log in again.');
        window.location.href = '/login';
    } else if (error.response?.status === 404) {
        alert('⚠️ Resource not found. Please check your request.');
    } else {
        alert(`⚠️ ${defaultMessage}: ${error.message}`);
    }
}

export async function fetchSessions() {
    try {
        const response = await fetch('http://localhost:8000/sessions');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        handleApiError(error, 'Failed to load sessions');
        return [];
    }
}

export async function createSession(sessionData) {
    try {
        const response = await fetch('http://localhost:8000/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sessionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        handleApiError(error, 'Failed to save session');
        throw error;
    }
}