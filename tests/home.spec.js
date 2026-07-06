// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Home', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('/');
  });

  test('Homepage loads correctly', async ({ page }) => {
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('.figure-svg')).toBeVisible();
    await expect(page.locator('.homeMessage')).toBeVisible();
  });

  test('Navigate to Timer page', async ({ page }) => {
    await page.getByRole('button', { name: 'Timer' }).click();
    await expect(page).toHaveURL('/timer');
  });

  test('Navigate to History page', async ({ page }) => {
    await page.getByRole('button', { name: 'History' }).click();
    await expect(page).toHaveURL('/history');
  });

  test('Navigate to Account page', async ({ page }) => {
    await page.getByRole('button', { name: 'Account' }).click();
    await expect(page).toHaveURL('/account');
  });

  test('Navigate to Customize page', async ({ page }) => {
    await page.getByRole('button', { name: 'Customize' }).click();
    await expect(page).toHaveURL('/customization');
  });

  test('Homepage stays on home page after reload', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL('/');
    await expect(page.locator('.figure-svg')).toBeVisible();
  });
});
