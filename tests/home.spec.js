// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe('Home', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {StudyPandaPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new StudyPandaPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.logIn(validEmail, validPassword);
    await loginPage.gotoHomePage();
  });

  test('Homepage loads correctly', async ({ page }) => {
    await loginPage.logoMessageVisible();
    await loginPage.pandaVisible();
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
