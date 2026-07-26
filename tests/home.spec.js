// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './pageObjects/HomePage';
import { AUTH } from './testData';

test.describe('Home', () => {
  /** @type {HomePage} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.visitLoginPage();
    await homePage.logIn(AUTH.email, AUTH.password);
    await homePage.assertHomePageSuccessful();
  });

  test('Homepage loads correctly', async () => {
    await homePage.assertHomePageLoaded();
  });

  test('Navigate to Timer page', async () => {
    await homePage.timerPageButton.click();
    await homePage.assertTimerPageSuccessful();
  });

  test('Navigate to History page', async () => {
    await homePage.historyPageButton.click();
    await homePage.assertHistoryPageSuccessful();
  });

  test('Navigate to Account page', async () => {
    await homePage.accountPageButton.click();
    await homePage.assertAccountPageSuccessful();
  });

  test('Navigate to Customize page', async () => {
    await homePage.customPageButton.click();
    await homePage.assertCustomizePageSuccessful();
  });

  test('Homepage stays on home page after reload', async ({ page }) => {
    await page.reload();
    await homePage.assertHomePageLoaded();
  });
});
