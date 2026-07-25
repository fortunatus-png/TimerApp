// @ts-check
import { test, expect } from '@playwright/test';
import { AccountPage } from './pageObjects/AccountPage';

test.describe('Account', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {AccountPage} */
  let accountPage;

  test.beforeEach(async ({ page }) => {
    accountPage = new AccountPage(page);
    await accountPage.visitLoginPage();
    await accountPage.logIn(validEmail, validPassword);
    await accountPage.assertAccountPageSuccessful();
  });

  test('Accountpage loads correctly', async ({ page }) => {
    await accountPage.assertAccountPageLoaded();
  });

  test('Log out is possible', async ({ page }) => {
    await accountPage.logoutButton.click();
    await accountPage.assertLoginPageSuccessful();
  });

  test('Accountpage stays on account page after reload', async ({ page }) => {
    await page.reload();
    await accountPage.assertAccountPageLoaded();
  });
});
