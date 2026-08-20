import { test, expect } from '@playwright/test';
import { AUTH, LOGIN } from '../testData';

test.describe('Login API', () => {
    test('GET / welcome message', async ({ request }) => {
        const response = await request.get('http://localhost:8000');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.message).toBe('Timer Session API is ready. Use /docs for testing.');
    });

    test('Successful login', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: {
                email: AUTH.email,
                password: AUTH.password
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('token');
    });

    test('Login with wrong email returns 401', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: {
                email: LOGIN.wrongEmail,
                password: AUTH.password
            }
        });
        expect(response.status()).toBe(401);
        const data = await response.json();
        expect(data.detail).toBe('Invalid credentials');
    });

    test('Login with empty email field returns 422', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: {
                email: LOGIN.empty,
                password: AUTH.password
            }
        });
        expect(response.status()).toBe(422);
    });

    test('Login with empty password returns 401', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: {
                email: AUTH.email,
                password: LOGIN.empty
            }
        });
        expect(response.status()).toBe(401);
    });

    test('Login with wrong password returns 401', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/login', {
            data: {
                email: AUTH.email,
                password: LOGIN.wrongPassword
            }
        });
        expect(response.status()).toBe(401);
        const data = await response.json();
        expect(data.detail).toBe('Invalid credentials');
    });
});