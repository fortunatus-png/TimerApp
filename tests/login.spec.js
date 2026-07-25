// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';

test.describe.parallel('Login', () => {
  const validEmail = 'ye@example.com';
  const wrongEmail = 'miau@example.com';
  const emptyCredential = '';
  const validPassword = 'stringst';
  const wrongPassword = 'stringss';
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visitLoginPage();
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.logIn(validEmail, validPassword);
    await loginPage.assertLoginPageSuccessful();
  });

  test('Failed login with wrong email', async () => {
    await loginPage.logIn(wrongEmail, validPassword);
    await loginPage.assertErrorMessage('Invalid credentials');
  });

  test('Failed login with an empty email field', async () => {
    await loginPage.logIn(emptyCredential, validPassword);
    await loginPage.assertErrorMessage('Email is required');
  });

  test('Failed login with wrong password', async () => {
    await loginPage.logIn(validEmail, wrongPassword);
    await loginPage.assertErrorMessage('Invalid credentials');
  });

  test('Failed login with an empty password field', async () => {
    await loginPage.logIn(validEmail, emptyCredential);
    await loginPage.assertErrorMessage('Password is required');
  });
});
