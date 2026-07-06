// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe.parallel('Login', () => {
  const validEmail = 'ye@example.com';
  const wrongEmail = 'miau@example.com';
  const emptyEmail = '';
  const validPassword = 'stringst';
  const wrongPassword = 'stringss';
  const emptyPassword = '';
  /** @type {StudyPandaPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new StudyPandaPage(page);
    await loginPage.gotoLoginPage();
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.logIn(validEmail, validPassword);
    await expect(page).toHaveURL('/');
  });

  test('Failed login with wrong email', async ({ page }) => {
    await loginPage.logIn(wrongEmail, validPassword);
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Failed login with an empty email field', async ({ page }) => {
    await loginPage.logIn(emptyEmail, validPassword);
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Failed login with wrong password', async ({ page }) => {
    await loginPage.logIn(validEmail, wrongPassword);
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Failed login with an empty password field', async ({ page }) => {
    await loginPage.logIn(validEmail, emptyPassword);
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});
