import { test, expect } from '@playwright/test'

test.describe('Session API', () => {
    async function getAuthToken(request) {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: { email: 'ye@example.com', password: 'stringst' }
        });
        const data = await response.json();
        return data.token;
    }

    test('GET /sessions returns 200 and array', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.get('http://localhost:8000/sessions', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
    });

    test('POST /sessions creates a new session', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.post('http://localhost:8000/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-05', minutes: 25, hour: 14 }
        });
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty('id');
        expect(data.minutes).toBe(25);
    });

    test('POST /sessions with negative minutes returns 422', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.post('http://localhost:8000/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-19', minutes: -15, hour: 13 }
        });
        expect(response.status()).toBe(422);
    });

    test('DELETE /sessions with invalid ID returns 404', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.delete('http://localhost:8000/sessions/9999', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(response.status()).toBe(404);
    });

    test('DELETE /sessions deletes an existing session', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.post('http://localhost:8000/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-19', minutes: 25, hour: 12 }
        });
        const session = await response.json();
        const deleteResponse = await request.delete(`http://localhost:8000/sessions/${session.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(deleteResponse.status()).toBe(200);
        const data = await deleteResponse.json();
        expect(data.message).toBe('Session deleted');
    });
});