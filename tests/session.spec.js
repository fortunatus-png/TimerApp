// @ts-check
import { test, expect } from '@playwright/test';
import { SessionPage } from './pageObjects/SessionPage';

test.describe('Session', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {SessionPage} */
  let sessionPage;

  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    sessionPage = new SessionPage(page);
    await sessionPage.visitLoginPage();
    await sessionPage.logIn(validEmail, validPassword);
    await sessionPage.assertSessionPageSuccessful();
  });

  test('Sessionpage loads correctly', async () => {
    await sessionPage.assertSessionPageLoaded();
  });

  test('Pause the countdown timer', async () => {
    await sessionPage.pauseButton.click();
    await expect(sessionPage.playButton).toBeVisible();
  });

  test('Resume the countdown timer', async () => {
    await sessionPage.pauseButton.click();
    await sessionPage.playButton.click();
    await expect(sessionPage.pauseButton).toBeVisible();
  });

  test('Warning message when leaving the page during active session', async () => {
    await sessionPage.historyPageButton.click();
    await expect(sessionPage.warningMessage).toBeVisible();
    await expect(sessionPage.continueButton).toBeVisible();
    await expect(sessionPage.leaveButton).toBeVisible();
  });

  test('Continue session after warning', async () => {
    await sessionPage.historyPageButton.click();
    await sessionPage.continueButton.click();
    await expect(sessionPage.warningMessage).not.toBeVisible();
    await expect(sessionPage.pauseButton).toBeVisible();
  });

  test('Leave session after warning', async () => {
    await sessionPage.historyPageButton.click();
    await sessionPage.leaveButton.click();
    await sessionPage.visitHistoryPage();
    await sessionPage.assertHistoryPageSuccessful();
  });

  // Skipped: These tests take 5+ minutes to complete.
  // test('Session completes successfully', async () => {
  //   test.setTimeout(310000);
  //   await sessionPage.assertSessionPageCompletedLoaded();
  // });

  // test('Start new session after completion', async () => {
  //   test.setTimeout(350000);
  //   await sessionPage.assertSessionPageCompletedLoaded();
  //   await sessionPage.newSessionStartButton.click();
  //   await sessionPage.assertTimerPageSuccessful;
  // });
});
