import { test, expect } from '@playwright/test'

test.describe('Authorization API', () => {
    async function getAuthToken(request) {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: { email: 'ye@example.com', password: 'stringst' }
        });
        const data = await response.json();
        return data.token;
    }

    test('GET /auth/me with valid token returns email', async ({ request }) => {
        const token = await getAuthToken(request);

        const response = await request.get('http://localhost:8000/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('email');
        expect(data.email).toBe('ye@example.com');
    });

    test('GET /auth/me without token returns 401', async ({ request }) => {
        const response = await request.get('http://localhost:8000/auth/me');
        expect(response.status()).toBe(401);
    });

    test('GET /auth/me with invalid token returns 401', async ({ request }) => {
        const invalidToken = 'invalid-token-12345';

        const response = await request.get('http://localhost:8000/auth/me', {
            headers: { 'Authorization': `Bearer ${invalidToken}` }
        });
        expect(response.status()).toBe(401);
    });
});