// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe('History', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {StudyPandaPage} */
  let historyPage;

  test.beforeEach(async ({ page }) => {
    historyPage = new StudyPandaPage(page);
    await historyPage.gotoLoginPage();
    await historyPage.logIn(validEmail, validPassword);
    await historyPage.historyPageBtn.click();
    await historyPage.expectHistoryPage();
  });

  test('Historypage loads correctly', async ({ page }) => {
    await expect(historyPage.heatmap).toBeVisible();
    await expect(historyPage.monthNav).toBeVisible();
  });

  test('Navigeate through months', async ({ page }) => {
    const originalMonth = await historyPage.getCurrentMonth();
    await historyPage.prevMonthBtn.click();
    await historyPage.expectMonthChanged(originalMonth);

    await historyPage.nextMonthBtn.click();
    await historyPage.nextMonthBtn.click();
    await historyPage.expectMonthChanged(originalMonth);

  });

  // test('Heatmap shows correct color for study time', async ({ page }) => {
  //   test.setTimeout(75000);
  //   await historyPage.gotoTimerPage();
  //   await historyPage.getShortStudySession();

  //   await page.reload();
  //   await expect(historyPage.cells.first()).toBeVisible();

  //   const todayCell = await historyPage.getCellForToday();
  //   const bgColor = await historyPage.getCellColor(todayCell);;
  //   expect(bgColor).toBe('rgb(200, 230, 201)');
  // });

  test('Historypage stays on history page after reload', async ({ page }) => {
    await page.reload();
    await expect(historyPage.heatmap).toBeVisible();
    await expect(historyPage.monthNav).toBeVisible();
  });
});
