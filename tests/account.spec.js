// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe('Account', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {StudyPandaPage} */
  let accountPage;

  test.beforeEach(async ({ page }) => {
    accountPage = new StudyPandaPage(page);
    await accountPage.gotoLoginPage();
    await page.waitForLoadState('networkidle');
    await accountPage.logIn(validEmail, validPassword);
    await accountPage.accountPageBtn.click();
    await accountPage.expectAccountPage();
  });

  test('Accountpage loads correctly', async ({ page }) => {
    await expect(accountPage.logOut).toBeVisible();
    await expect(accountPage.emailAddress).toBeVisible();
  });

  test('Log out is possible', async ({ page }) => {
    await accountPage.logOut.click();
    await accountPage.expectLoginPage();
  });

  test('Accountpage stays on account page after reload', async ({ page }) => {
    await page.reload();
    await expect(accountPage.logOut).toBeVisible();
    await expect(accountPage.emailAddress).toBeVisible();
  });
});
