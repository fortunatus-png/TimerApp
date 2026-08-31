import { test as base, expect } from '@playwright/test';
import { AUTH } from './testData';

export const test = base.extend({
  authToken: async ({ request }, use) => {
    const response = await request.post('/auth/login', {
      data: { email: AUTH.email, password: AUTH.password }
    });
    const data = await response.json();
    await use(data.token);
  },
});

export { expect };
