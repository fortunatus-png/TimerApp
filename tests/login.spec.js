import { test, expect } from '@playwright/test';

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('ye@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('/');
  });

  test('Failed login with wrong email', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('miau@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Failed login with an empty email field', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Failed login with wrong password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringstt');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Failed login with an empty password field', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('yeye@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});
