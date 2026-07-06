// @ts-check
import { test, expect } from '@playwright/test';
import { StudyPandaPage } from './studyPandaPage';

test.describe('Signup', () => {
  const validEmail = 'new-user@example.com';
  const invalidEmail = 'yeexample.com';
  const emptyEmail = '';
  const validPassword = 'stringst';
  const shortPassword = 'string';
  const emptyPassword = '';
  /** @type {StudyPandaPage} */
  let signupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new StudyPandaPage(page);
    await signupPage.gotoLoginPage();
  });

  test('Successful signup with valid credentials', async ({ page }) => {
    await signupPage.signUp(validEmail, validPassword);
    await expect(page).toHaveURL('/');
  });

  test('Failed signup with invalid email format', async ({ page }) => {
    await signupPage.signUp(invalidEmail, validPassword);
    await expect(page.getByText('Enter a valid email (e.g., name@domain.com)')).toBeVisible();
  });

  test('Failed signup with an empty email field', async ({ page }) => {
    await signupPage.signUp(emptyEmail, validPassword);
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Failed signup with email that already exists', async ({ page }) => {
    await signupPage.signUp(validEmail, validPassword);
    await expect(page.getByText('Email already exists')).toBeVisible();
  });

  test('Failed signup with password too short', async ({ page }) => {
    await signupPage.signUp(validEmail, shortPassword);
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('Failed signup with an empty password field', async ({ page }) => {
    await signupPage.signUp(validEmail, emptyPassword);
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});
