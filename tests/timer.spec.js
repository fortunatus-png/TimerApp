// @ts-check
import { test, expect } from '@playwright/test';
import { TimerPage } from './pageObjects/TimerPage';

test.describe('Timer', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {TimerPage} */
  let timerPage;

  test.beforeEach(async ({ page }) => {
    timerPage = new TimerPage(page);
    await timerPage.visitLoginPage();
    await timerPage.logIn(validEmail, validPassword);
    await timerPage.assertTimerPageSuccessful();
  });

  test('Timerpage loads correctly', async () => {
    await timerPage.assertTimerPageLoaded();
  });

  test('Set up the time with range slider', async () => {
    await timerPage.slider.fill('25');
    await expect(timerPage.minutes25).toBeVisible();
  });

  test('Start the timer with the minimum time', async () => {
    await timerPage.startButton.click();
    await timerPage.assertSessionPageLoaded();
    await timerPage.assertSessionPageSuccessful();
  });

  test('Start the timer with the maximum time', async () => {
    await timerPage.slider.fill('180');
    await timerPage.startButton.click();
    await expect(timerPage.minutes180).toBeVisible();
    await expect(timerPage.studyPanda).toBeVisible();
    await timerPage.assertSessionPageSuccessful();
  });

  test('Timerpage stays on timer page after reload', async ({ page }) => {
    await page.reload();
    await timerPage.assertTimerPageLoaded();
  });
});
