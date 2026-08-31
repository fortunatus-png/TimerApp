import { test, expect } from '../fixtures';

test.describe('Session API', () => {
    test('GET /sessions returns 200 and array', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.get('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
    });

    test('GET /sessions returns 401 with invalid token', async ({ request }) => {
        const invalidToken = '0123456789012345678901234567890123456789012345678901234567890123';

        const response = await request.get('/sessions', {
            headers: { 'Authorization': `Bearer ${invalidToken}` }
        });
        expect(response.status()).toBe(401);
    });

    test('GET /sessions returns 401 without token', async ({ request }) => {
        const response = await request.get('/sessions');
        expect(response.status()).toBe(401);
    });

    test('POST /sessions creates a new session', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.post('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-05', minutes: 25, hour: 14 }
        });
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty('id');
        expect(data.minutes).toBe(25);
    });

    test('POST /sessions with negative minutes returns 422', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.post('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-19', minutes: -15, hour: 13 }
        });
        expect(response.status()).toBe(422);
    });

    test('POST /sessions with -1 hour returns 422', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.post('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-19', minutes: 25, hour: -1 }
        });
        expect(response.status()).toBe(422);
    });

    test('POST /sessions with 24 hour returns 422', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.post('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-19', minutes: 25, hour: 24 }
        });
        expect(response.status()).toBe(422);
    });

    test('POST /sessions with invalid date returns 422', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.post('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: 'not-a-date', minutes: 25, hour: 15 }
        });
        expect(response.status()).toBe(422);
    });

    test('POST /sessions without data returns 422', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.post('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: {}
        });
        expect(response.status()).toBe(422);
    });

    test('POST /sessions returns 401 without token', async ({ request }) => {
        const response = await request.post('/sessions', {
            data: { date: '2026-08-05', minutes: 25, hour: 14 }
        });
        expect(response.status()).toBe(401);
    });

    test('DELETE /sessions with invalid ID returns 404', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.delete('/sessions/99999', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(response.status()).toBe(404);
    });

    test('DELETE /sessions deletes an existing session', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.post('/sessions', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { date: '2026-08-19', minutes: 25, hour: 12 }
        });
        const session = await response.json();
        const deleteResponse = await request.delete(`/sessions/${session.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(deleteResponse.status()).toBe(200);
        const data = await deleteResponse.json();
        expect(data.message).toBe('Session deleted');
    });

    test('DELETE /sessions returns 401 with invalid token', async ({ request }) => {
        const invalidToken = '0123456789012345678901234567890123456789012345678901234567890123';

        const response = await request.delete('/sessions/99999', {
            headers: { 'Authorization': `Bearer ${invalidToken}` }
        });
        expect(response.status()).toBe(401);
    });
});