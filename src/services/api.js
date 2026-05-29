export async function fetchSessions() {
    const response = await fetch('http://localhost:8000/sessions');
    const data = await response.json();
    return data;
}