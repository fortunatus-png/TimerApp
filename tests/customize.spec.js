// @ts-check
import { test, expect } from '@playwright/test';

test.describe.parallel('Customize', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Customize' }).click();
    await expect(page).toHaveURL('/customization');
  });

  test('Customizepage loads correctly', async ({ page }) => {
    await expect(page.locator('#background-color-wish')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset Data' })).toBeVisible();
  });

  test('Choose a color for the background', async ({ page }) => {
    const oldBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.locator('input[type="color"]').fill('#ff0000');
    const newBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(newBg).toBe('rgb(255, 0, 0)');
    expect(newBg).not.toBe(oldBg);
  });

  test('Chosen color persists after reload', async ({ page }) => {
    const oldBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.locator('input[type="color"]').fill('#ff0000');
    const newBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(newBg).toBe('rgb(255, 0, 0)');
    expect(newBg).not.toBe(oldBg);
    await page.reload();
    expect(newBg).not.toBe(oldBg);
  });

  test('Reset background to default color', async ({ page }) => {
    await page.locator('input[type="color"]').fill('#ff0000');
    await expect(page.evaluate(() => getComputedStyle(document.body).backgroundColor))
      .resolves.toBe('rgb(255, 0, 0)');

    await page.getByRole('button', { name: 'Reset Data' }).click();
    const resetBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(resetBg).not.toBe('rgb(255, 0, 0)');
  });

  test('Customizepage stays on customize page after reload', async ({ page }) => {
    await page.reload();
    await expect(page.locator('#background-color-wish')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset Data' })).toBeVisible();
  });
});
