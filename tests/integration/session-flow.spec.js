import { test, expect } from '@playwright/test';
import { AUTH } from '../testData';

test('User can create sessions', async ({ request }) => {
    const loginResponse = await request.post('http://localhost:8000/auth/login', {
        data: { email: AUTH.email, password: AUTH.password }
    });
    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    expect(loginData.message).toBe('Login successful');
    expect(loginData.email).toBe(AUTH.email);
    expect(loginData.token).toMatch(/^[a-f0-9]{64}$/);

    const token = loginData.token;
    const createSession = await request.post('http://localhost:8000/sessions', {
        headers: { 'Authorization': `Bearer ${token}` },
        data: { date: '2026-08-26', minutes: 25, hour: 8 }
    });
    expect(createSession.status()).toBe(201);
    const sessionData = await createSession.json();
    expect(sessionData).toHaveProperty('id');
    expect(sessionData.minutes).toBe(25);

    const getSession = await request.get('http://localhost:8000/sessions', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(getSession.status()).toBe(200);
    const getData = await getSession.json();
    expect(getData).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: sessionData.id, date: '2026-08-26', minutes: 25, hour: 8
            })
        ])
    );

    const deleteSession = await request.delete(`http://localhost:8000/sessions/${sessionData.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(deleteSession.status()).toBe(200);
    const deleteData = await deleteSession.json();
    expect(deleteData.message).toBe('Session deleted');

    const sessionAfterDelete = await request.get('http://localhost:8000/sessions', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(sessionAfterDelete.status()).toBe(200);
    const dataAfterDelete = await sessionAfterDelete.json();
    expect(dataAfterDelete).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining({ id: sessionData.id })
        ])
    );
});