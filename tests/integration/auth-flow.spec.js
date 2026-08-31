import { test, expect } from '@playwright/test';
import { SIGNUP, uniqueEmail } from '../testData';

test('User can register, login and access profile', async ({ request }) => {
    const email = uniqueEmail();
    const password = SIGNUP.validPassword;

    const registerResponse = await request.post('/auth/register', {
        data: { email: email, password: password }
    });
    expect(registerResponse.status()).toBe(201);
    const registerData = await registerResponse.json();
    expect(registerData).toHaveProperty('id');
    expect(registerData.email).toBe(email);

    const loginResponse = await request.post('/auth/login', {
        data: { email: email, password: password }
    });
    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    expect(loginData.message).toBe('Login successful');
    expect(loginData.email).toBe(email);
    expect(loginData.token).toMatch(/^[a-f0-9]{64}$/);

    const token = loginData.token;
    const authResponse = await request.get('/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    expect(authData.email).toBe(email);
});