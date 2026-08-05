import { test, expect } from '@playwright/test'

test.describe('Session API', () => {
    async function getAuthToken(request) {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: {
                email: 'ye@example.com',
                password: 'stringst'
            }
        });
        const data = await response.json();
        return data.token;
    }

    test('GET /sessions returns 200 and array', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.get('http://localhost:8000/sessions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
    });

    test('POST /sessions creates a new session', async ({ request }) => {
        const token = await getAuthToken(request);

        const sessionData = {
            date: '2026-08-05',
            minutes: 25,
            hour: 14
        };
        const response = await request.post('http://localhost:8000/sessions', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: sessionData
        });
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty('id');
        expect(data.minutes).toBe(25);
    });
});