import { test, expect } from '@playwright/test';

test.describe('Session', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Timer' }).click();
    await page.getByRole('slider').fill('25');
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page).toHaveURL('/session');
  });

  test('Sessionpage loads correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '25' })).toBeVisible();
    await expect(page.getByRole('img')).toBeVisible();
  });

  
});
