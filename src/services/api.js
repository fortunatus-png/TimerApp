export async function fetchSessions() {
    const response = await fetch('http://localhost:8000/sessions');
    const data = await response.json();
    return data;
}

export async function createSession(sessionData) {
    const response = await fetch('http://localhost:8000/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}