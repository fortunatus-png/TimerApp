import { test, expect } from '@playwright/test';
import { SIGNUP, uniqueEmail } from '../testData';

test.describe('Registration API', () => {
    test('Successful registration', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/register', {
            data: {
                email: uniqueEmail(),
                password: SIGNUP.validPassword
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toHaveProperty('id');
    });

    test('Registration with existing email returns 400', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/register', {
            data: {
                email: SIGNUP.existingEmail,
                password: SIGNUP.validPassword
            }
        });
        expect(response.status()).toBe(400);
        const data = await response.json();
        expect(data.detail).toBe('Email already exists');
    });

    test('Registration with invalid email format returns 422', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/register', {
            data: {
                email: SIGNUP.invalidEmail,
                password: SIGNUP.validPassword
            }
        });
        expect(response.status()).toBe(422);
    });

    test('Registration with short password returns 422', async ({ request }) => {
        const response = await request.post('http://localhost:8000/auth/register', {
            data: {
                email: uniqueEmail('shortpw'),
                password: SIGNUP.shortPassword
            }
        });
        expect(response.status()).toBe(422);
    });
});