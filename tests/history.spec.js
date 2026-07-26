// @ts-check
import { test, expect } from '@playwright/test';
import { HistoryPage } from './pageObjects/HistoryPage';
import { AUTH } from './testData';

test.describe('History', () => {
  /** @type {HistoryPage} */
  let historyPage;

  test.beforeEach(async ({ page }) => {
    historyPage = new HistoryPage(page);
    await historyPage.visitLoginPage();
    await historyPage.logIn(AUTH.email, AUTH.password);
    await historyPage.assertHistoryPageSuccessful();
  });

  test('Historypage loads correctly', async () => {
    await historyPage.assertHistoryPageLoaded();
  });

  test('Navigeate through months', async () => {
    const originalMonth = await historyPage.getCurrentMonth();
    await historyPage.prevMonthBtn.click();
    await historyPage.assertMonthChanged(originalMonth);

    await historyPage.nextMonthBtn.click();
    await historyPage.nextMonthBtn.click();
    await historyPage.assertMonthChanged(originalMonth);

  });

  // test('Heatmap shows correct color for study time', async ({ page }) => {
  //   test.setTimeout(75000);
  //   await historyPage.visitTimerPage();
  //   await historyPage.getShortStudySession();

  //   await page.reload();
  //   await expect(historyPage.cells.first()).toBeVisible();

  //   const todayCell = await historyPage.getCellForToday();
  //   const bgColor = await historyPage.getCellColor(todayCell);;
  //   expect(bgColor).toBe('rgb(200, 230, 201)');
  // });

  test('Historypage stays on history page after reload', async ({ page }) => {
    await page.reload();
    await historyPage.assertHistoryPageLoaded();
  });
});
