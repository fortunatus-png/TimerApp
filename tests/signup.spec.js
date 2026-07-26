// @ts-check
import { test, expect } from '@playwright/test';
import { SignupPage } from './pageObjects/SignupPage';
import { SIGNUP, uniqueEmail } from './testData';

test.describe('Signup', () => {
  /** @type {SignupPage} */
  let signupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.visitLoginPage();
  });

  test('Successful signup with valid credentials', async () => {
    await signupPage.signUp(uniqueEmail(), SIGNUP.validPassword);
    await signupPage.assertSignupSuccessful();
  });

  test('Failed signup with invalid email format', async () => {
    await signupPage.signUp(SIGNUP.invalidEmail, SIGNUP.validPassword);
    await signupPage.assertErrorMessage('Enter a valid email (e.g., name@domain.com)');
  });

  test('Failed signup with an empty email field', async () => {
    await signupPage.signUp(SIGNUP.empty, SIGNUP.validPassword);
    await signupPage.assertErrorMessage('Email is required');
  });

  test('Failed signup with email that already exists', async () => {
    await signupPage.signUp(SIGNUP.existingEmail, SIGNUP.validPassword);
    await signupPage.assertErrorMessage('Email already exists');
  });

  test('Failed signup with password too short', async () => {
    await signupPage.signUp(uniqueEmail('shortpw'), SIGNUP.shortPassword);
    await signupPage.assertErrorMessage('Password must be at least 8 characters');
  });

  test('Failed signup with an empty password field', async () => {
    await signupPage.signUp(uniqueEmail('emptypw'), SIGNUP.empty);
    await signupPage.assertErrorMessage('Password is required');
  });
});
