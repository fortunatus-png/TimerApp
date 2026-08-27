import { test, expect } from '../fixtures';
import { AUTH } from '../testData';

test.describe('Authorization API', () => {
    test('GET /auth/me with valid token returns email', async ({ request, authToken }) => {
        const token = authToken;

        const response = await request.get('/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('email');
        expect(data.email).toBe(AUTH.email);
    });

    test('GET /auth/me without token returns 401', async ({ request }) => {
        const response = await request.get('/auth/me');
        expect(response.status()).toBe(401);
    });

    test('GET /auth/me with invalid token returns 401', async ({ request }) => {
        const invalidToken = 'invalid-token-12345';

        const response = await request.get('/auth/me', {
            headers: { 'Authorization': `Bearer ${invalidToken}` }
        });
        expect(response.status()).toBe(401);
    });
});