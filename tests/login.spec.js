// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';
import { AUTH, LOGIN } from './testData';

test.describe('Login', () => {
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visitLoginPage();
  });

  test('Successful login with valid credentials', async () => {
    await loginPage.logIn(AUTH.email, AUTH.password);
    await loginPage.assertLoginPageSuccessful();
  });

  test('Failed login with wrong email', async () => {
    await loginPage.logIn(LOGIN.wrongEmail, AUTH.password);
    await loginPage.assertErrorMessage('Invalid credentials');
  });

  test('Failed login with an empty email field', async () => {
    await loginPage.logIn(LOGIN.empty, AUTH.password);
    await loginPage.assertErrorMessage('Email is required');
  });

  test('Failed login with wrong password', async () => {
    await loginPage.logIn(AUTH.email, LOGIN.wrongPassword);
    await loginPage.assertErrorMessage('Invalid credentials');
  });

  test('Failed login with an empty password field', async () => {
    await loginPage.logIn(AUTH.email, LOGIN.empty);
    await loginPage.assertErrorMessage('Password is required');
  });
});
