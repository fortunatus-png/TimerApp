// @ts-check
import { test, expect } from '@playwright/test';
import { SignupPage } from './pageObjects/SignupPage';

test.describe('Signup', () => {
  const validEmail = `new-user-${Date.now()}@example.com`;
  const existedEmail = `user@example.com`;
  const invalidEmail = 'yeexample.com';
  const emptyCredential = '';
  const validPassword = 'stringst';
  const shortPassword = 'string';
  /** @type {SignupPage} */
  let signupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.visitLoginPage();
  });

  test('Successful signup with valid credentials', async () => {
    await signupPage.signUp(validEmail, validPassword);
    await signupPage.assertSignupSuccessful();
  });

  test('Failed signup with invalid email format', async () => {
    await signupPage.signUp(invalidEmail, validPassword);
    await signupPage.assertErrorMessage('Enter a valid email (e.g., name@domain.com)');
  });

  test('Failed signup with an empty email field', async () => {
    await signupPage.signUp(emptyCredential, validPassword);
    await signupPage.assertErrorMessage('Email is required');
  });

  test('Failed signup with email that already exists', async () => {
    await signupPage.signUp(existedEmail, validPassword);
    await signupPage.assertErrorMessage('Email already exists');
  });

  test('Failed signup with password too short', async () => {
    await signupPage.signUp(validEmail, shortPassword);
    await signupPage.assertErrorMessage('Password must be at least 8 characters');
  });

  test('Failed signup with an empty password field', async () => {
    await signupPage.signUp(validEmail, emptyCredential);
    await signupPage.assertErrorMessage('Password is required');
  });
});
