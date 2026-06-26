import { test, expect } from '@playwright/test';

test.describe('Signup', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Successful signup with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('ye@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page).toHaveURL('/');
  });

  test('Failed signup with invalid email format', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('ye@example');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Enter a valid email (e.g., name@domain.com)')).toBeVisible();
  });

  test('Failed signup with an empty email field', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Failed signup with email that already exists', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('stringst');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Email already exists')).toBeVisible();
  });

  test('Failed signup with password too short', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('yeye@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('string');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('Failed signup with an empty password field', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('yeye@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});
