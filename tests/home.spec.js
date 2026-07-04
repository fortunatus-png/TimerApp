// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe('Home', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {StudyPandaPage} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new StudyPandaPage(page);
    await homePage.gotoLoginPage();
    await homePage.logIn(validEmail, validPassword);
    await homePage.expectHomePage();
  });

  test('Homepage loads correctly', async ({ page }) => {
    await homePage.homeElementsVisible();
  });

  test('Navigate to Timer page', async ({ page }) => {
    await homePage.timerPageBtn.click();
    await homePage.expectTimerPage();
  });

  test('Navigate to History page', async ({ page }) => {
    await homePage.historyPageBtn.click();
    await homePage.expectHistoryPage();
  });

  test('Navigate to Account page', async ({ page }) => {
    await homePage.accountPageBtn.click();
    await homePage.expectAccountPage();
  });

  test('Navigate to Customize page', async ({ page }) => {
    await homePage.customPageBtn.click();
    await homePage.expectCustomizePage();
  });

  test('Homepage stays on home page after reload', async ({ page }) => {
    await page.reload();
    await homePage.expectHomePage();
    await homePage.homeElementsVisible();
  });
});
