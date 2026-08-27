import { test, expect } from '@playwright/test';
import { SIGNUP, uniqueEmail } from '../testData';

test('User B cannot access sessions of User A', async ({ request }) => {
    const emailUserA = uniqueEmail('user-a');
    const passwordUserA = SIGNUP.validPassword;
    const emailUserB = uniqueEmail('user-b');
    const passwordUserB = SIGNUP.validPassword;

    const registerUserA = await request.post('/auth/register', {
        data: { email: emailUserA, password: passwordUserA }
    });
    expect(registerUserA.status()).toBe(201);

    const loginUserA = await request.post('/auth/login', {
        data: { email: emailUserA, password: passwordUserA }
    });
    expect(loginUserA.status()).toBe(200);
    const dataUserA = await loginUserA.json();
    const tokenUserA = dataUserA.token;

    const sessionUserA = await request.post('/sessions', {
        headers: { 'Authorization': `Bearer ${tokenUserA}` },
        data: { date: '2026-08-27', minutes: 25, hour: 8 }
    });
    expect(sessionUserA.status()).toBe(201);
    const sessionDataUserA = await sessionUserA.json();
    const idUserA = sessionDataUserA.id;

    const registerUserB = await request.post('/auth/register', {
        data: { email: emailUserB, password: passwordUserB }
    });
    expect(registerUserB.status()).toBe(201);

    const loginUserB = await request.post('/auth/login', {
        data: { email: emailUserB, password: passwordUserB }
    });
    expect(loginUserB.status()).toBe(200);
    const dataUserB = await loginUserB.json();
    const tokenUserB = dataUserB.token;

    const getSessionsB = await request.get('/sessions', {
        headers: { 'Authorization': `Bearer ${tokenUserB}` }
    });
    expect(getSessionsB.status()).toBe(200);
    const sessionsB = await getSessionsB.json();

    const sessionIds = sessionsB.map(s => s.id);
    expect(sessionIds).not.toContain(idUserA);

    const deleteSession = await request.delete(`/sessions/${idUserA}`, {
        headers: { 'Authorization': `Bearer ${tokenUserB}` }
    });
    expect(deleteSession.status()).toBe(404);
});