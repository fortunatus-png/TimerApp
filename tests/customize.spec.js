// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe.parallel('Customize', () => {
  const validEmail = 'ye@example.com';
  const validPassword = 'stringst';
  /** @type {StudyPandaPage} */
  let customizePage;

  test.beforeEach(async ({ page }) => {
    customizePage = new StudyPandaPage(page);
    await customizePage.gotoLoginPage();
    await customizePage.logIn(validEmail, validPassword);
    await customizePage.customPageBtn.click();
    await customizePage.expectCustomizePage();
  });

  test('Customizepage loads correctly', async ({ page }) => {
    await customizePage.getCustomizeElements();
  });

  test('Choose a color for the background', async ({ page }) => {
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
    expect(newBg).toBe('rgb(255, 0, 0)');
    expect(newBg).not.toBe(oldBg);
  });

  test('Reset background to default color', async ({ page }) => {
    await customizePage.selectColor('#ff0000');
    await customizePage.expectBackgroundColor('rgb(255, 0, 0)');

    await customizePage.resetBtn.click();
    const resetBg = await customizePage.getBackgroundColor();
    expect(resetBg).not.toBe('rgb(255, 0, 0)');
  });

  test('Customizepage stays on customize page after reload', async ({ page }) => {
    await page.reload();
    await customizePage.getCustomizeElements();
  });
});
