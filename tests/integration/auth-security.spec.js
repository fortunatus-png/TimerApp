import { test, expect } from '@playwright/test';

test('Invalid token is rejected by every protected endpoint', async ({ request }) => {
    const invalidToken = '0123456789012345678901234567890123456789012345678901234567890123';

    const response = await request.get('/auth/me', {
        headers: { 'Authorization': `Bearer ${invalidToken}` }
    });
    expect(response.status()).toBe(401);

    const getSessions = await request.get('/sessions', {
        headers: { 'Authorization': `Bearer ${invalidToken}` }
    });
    expect(getSessions.status()).toBe(401);

    const addSessions = await request.post('/sessions', {
        headers: { 'Authorization': `Bearer ${invalidToken}` },
        data: { date: '2026-08-05', minutes: 25, hour: 14 }
    });
    expect(addSessions.status()).toBe(401);

    const deleteSessions = await request.delete('/sessions/99999', {
        headers: { 'Authorization': `Bearer ${invalidToken}` }
    });
    expect(deleteSessions.status()).toBe(401);
});