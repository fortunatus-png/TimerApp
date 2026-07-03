// @ts-check
import { test, expect } from '@playwright/test';

test.describe.parallel('Timer', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Timer' }).click();
    await expect(page).toHaveURL('/timer');
  });

  test('Timerpage loads correctly', async ({ page }) => {
    await expect(page.getByRole('slider')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.locator('.figure-svg')).toBeVisible();
    await expect(page.getByText('5 Minutes')).toBeVisible();
  });

  test('Set up the time with range slider', async ({ page }) => {
    await page.getByRole('slider').fill('25');
    await expect(page.getByText('25 Minutes')).toBeVisible();
  });

  test('Start the timer with the minimum time', async ({ page }) => {
    await page.getByRole('slider').fill('5');
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.getByRole('heading', { name: '5' })).toBeVisible();
    await expect(page.getByRole('img')).toBeVisible();
    await expect(page).toHaveURL('/session');
  });

  test('Start the timer with the maximum time', async ({ page }) => {
    await page.getByRole('slider').fill('180');
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.getByRole('heading', { name: '180' })).toBeVisible();
    await expect(page.getByRole('img')).toBeVisible();
    await expect(page).toHaveURL('/session');
  });

  test('Timerpage stays on timer page after reload', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL('/timer');
    await expect(page.getByRole('slider')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.locator('.figure-svg')).toBeVisible();
    await expect(page.getByText('5 Minutes')).toBeVisible();
  });
});
