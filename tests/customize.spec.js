// @ts-check
import { test, expect } from '@playwright/test';
import { CustomizePage } from './pageObjects/CustomizePage';
import { AUTH } from './testData';

test.describe('Customize', () => {
  /** @type {CustomizePage} */
  let customizePage;

  test.beforeEach(async ({ page }) => {
    customizePage = new CustomizePage(page);
    await customizePage.visitLoginPage();
    await customizePage.logIn(AUTH.email, AUTH.password);
    await customizePage.assertCustomizePageSuccessful();
  });

  test('Customizepage loads correctly', async () => {
    await customizePage.assertCustomizePageLoaded();
  });

  test('Choose a color for the background', async () => {
    const oldBg = await customizePage.getBackgroundColor();
    await customizePage.selectColor('#ff0000');
    await customizePage.expectBackgroundColor('rgb(255, 0, 0)');
    await customizePage.expectBackgroundColorNot(oldBg);
  });

  test('Chosen color persists after reload', async ({ page }) => {
    const oldBg = await customizePage.getBackgroundColor();

    await customizePage.selectColor('#ff0000');
    await customizePage.expectBackgroundColor('rgb(255, 0, 0)');

    await page.reload();

    const newBg = await customizePage.getBackgroundColor();
    await expect(newBg).toBe('rgb(255, 0, 0)');
    await expect(newBg).not.toBe(oldBg);
  });

  test('Reset background to default color', async () => {
    await customizePage.selectColor('#ff0000');
    await customizePage.expectBackgroundColor('rgb(255, 0, 0)');

    await customizePage.resetButton.click();
    const resetBg = await customizePage.getBackgroundColor();
    await expect(resetBg).not.toBe('rgb(255, 0, 0)');
  });

  test('Customizepage stays on customize page after reload', async ({ page }) => {
    await page.reload();
    await customizePage.assertCustomizePageLoaded();
  });
});
