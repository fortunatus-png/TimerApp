import { test, expect } from '@playwright/test';

test.describe('Session', () => {

  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Timer' }).click();
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page).toHaveURL('/session');
  });

  test('Sessionpage loads correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '5' })).toBeVisible();
    await expect(page.getByRole('img')).toBeVisible();
  });

  test('Pause the countdown timer', async ({ page }) => {
    await page.getByRole('button', { name: '⏸' }).click();
    await expect(page.getByRole('button', { name: '▶' })).toBeVisible();
  });

  test('Resume the countdown timer', async ({ page }) => {
    await page.getByRole('button', { name: '⏸' }).click();
    await page.getByRole('button', { name: '▶' }).click();
    await expect(page.getByRole('button', { name: '⏸' })).toBeVisible();
  });

  test('Warning message when leaving the page during active session', async ({ page }) => {
    await page.getByRole('button', { name: 'History' }).click();
    await expect(page.getByText('Your progress so far will be saved, but you won\'t be able to continue this session later.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Leave' })).toBeVisible();
  });

  test('Continue session after warning', async ({ page }) => {
    await page.getByRole('button', { name: 'History' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Your progress so far will be saved, but you won\'t be able to continue this session later.')).not.toBeVisible();
    await expect(page.getByRole('button', { name: '⏸' })).toBeVisible();
  });

  test('Leave session after warning', async ({ page }) => {
    await page.getByRole('button', { name: 'History' }).click();
    await page.getByRole('button', { name: 'Leave' }).click();
    await page.goto('/history');
    await expect(page).toHaveURL('/history');
  });

  //to do
  test('Session completes successfully', async ({ page }) => {
    await page.clock.fastForward(5 * 60 * 1000);
    console.log(
      await page.locator('h1').textContent()
    );
    await expect(page.getByRole('heading', { name: '🎉 Great job!' })).toBeVisible();
    await expect(page.getByText('You studied for 5 minutes!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start new session' })).toBeVisible();
  });

});
