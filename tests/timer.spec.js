// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe('Timer', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {StudyPandaPage} */
  let logTimerPage;

  test.beforeEach(async ({ page }) => {
    logTimerPage = new StudyPandaPage(page);
    await logTimerPage.gotoLoginPage();
    await page.waitForLoadState('networkidle');
    await logTimerPage.logIn(validEmail, validPassword);
    await logTimerPage.timerPageBtn.click();
    await logTimerPage.expectTimerPage();
  });

  test('Timerpage loads correctly', async ({ page }) => {
    await logTimerPage.getTimerElements();
  });

  test('Set up the time with range slider', async ({ page }) => {
    await logTimerPage.slider.fill('25');
    await expect(logTimerPage.twentyfive).toBeVisible();
  });

  test('Start the timer with the minimum time', async ({ page }) => {
    await logTimerPage.startBtn.click();
    await logTimerPage.getSessionElements();
    await logTimerPage.expectSessionPage();
  });

  test('Start the timer with the maximum time', async ({ page }) => {
    await logTimerPage.slider.fill('180');
    await logTimerPage.startBtn.click();
    await expect(logTimerPage.hundredeighty).toBeVisible();
    await expect(logTimerPage.pandaStudying).toBeVisible();
    await logTimerPage.expectSessionPage();
  });

  test('Timerpage stays on timer page after reload', async ({ page }) => {
    await page.reload();
    await logTimerPage.expectTimerPage();
    await logTimerPage.getTimerElements();
  });
});
