// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe('Session', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {StudyPandaPage} */
  let sessionPage;

  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    sessionPage = new StudyPandaPage(page);
    await sessionPage.gotoLoginPage();
    await sessionPage.logIn(validEmail, validPassword);
    await sessionPage.timerPageBtn.click();
    await sessionPage.startBtn.click();
    await sessionPage.expectSessionPage();
  });

  test('Sessionpage loads correctly', async ({ page }) => {
    await sessionPage.getSessionElements();
  });

  test('Pause the countdown timer', async ({ page }) => {
    await sessionPage.pauseBtn.click();
    await expect(sessionPage.playBtn).toBeVisible();
  });

  test('Resume the countdown timer', async ({ page }) => {
    await sessionPage.pauseBtn.click();
    await sessionPage.playBtn.click();
    await expect(sessionPage.pauseBtn).toBeVisible();
  });

  test('Warning message when leaving the page during active session', async ({ page }) => {
    await sessionPage.historyPageBtn.click();
    await expect(sessionPage.warningMessage).toBeVisible();
    await expect(sessionPage.continueBtn).toBeVisible();
    await expect(sessionPage.leaveBtn).toBeVisible();
  });

  test('Continue session after warning', async ({ page }) => {
    await sessionPage.historyPageBtn.click();
    await sessionPage.continueBtn.click();
    await expect(sessionPage.warningMessage).not.toBeVisible();
    await expect(sessionPage.pauseBtn).toBeVisible();
  });

  test('Leave session after warning', async ({ page }) => {
    await sessionPage.historyPageBtn.click();
    await sessionPage.leaveBtn.click();
    await sessionPage.gotoHistoryPage();
    await sessionPage.expectHistoryPage();
  });

  // test('Session completes successfully', async ({ page }) => {
  //   test.setTimeout(310000);
  //   await sessionPage.getSessionCompletedElements();
  // });

  // test('Start new session after completion', async ({ page }) => {
  //   test.setTimeout(350000);
  //   await sessionPage.getSessionCompletedElements();
  //   await sessionPage.newStartBtn.click();
  //   await sessionPage.expectTimerPage;
  // });
});
