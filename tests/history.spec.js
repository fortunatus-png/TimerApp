import { test, expect } from '@playwright/test';

test.describe('History', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'History' }).click();
    await expect(page).toHaveURL('/history');
  });

  test('Historypage loads correctly', async ({ page }) => {
    await expect(page.locator('#heatmap-wrapper')).toBeVisible();
    await expect(page.locator('#month-navigation')).toBeVisible();
  });

  test('Navigeate through months', async ({ page }) => {
    await page.locator('#prevBtn').click();
    await expect(page.getByText('May')).toBeVisible();

    await page.locator('#nextBtn').click();
    await page.locator('#nextBtn').click();
    await expect(page.getByText('July')).toBeVisible();
  });

  test('Historypage stays on history page after reload', async ({ page }) => {
    await page.reload();
    await expect(page.locator('#heatmap-wrapper')).toBeVisible();
    await expect(page.locator('#month-navigation')).toBeVisible();
  });

  test('Heatmap shows correct color for study time', async ({ page }) => {
    test.setTimeout(70000);
    await page.goto('/timer');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForTimeout(63000);
    await page.getByRole('button', { name: 'History' }).click();
    await page.getByRole('button', { name: 'Leave' }).click();
    await page.reload();

    const cells = page.locator('.heatCell');
    await expect(cells.first()).toBeVisible();

    const today = new Date().getDate();
    const currentHour = new Date().getHours();
    const adjustedHour = (currentHour - 2 + 24) % 24;

    const cellIndex = (today - 1) * 24 + adjustedHour;
    const todayCell = cells.nth(cellIndex);

    const bgColor = await todayCell.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe('rgb(200, 230, 201)');
  });

});
