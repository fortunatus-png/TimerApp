import { expect } from '@playwright/test';

export class AccountPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

        this.logoutButton = page.getByRole('button', { name: 'Log Out' });
        this.emailAddress = page.locator('#email');
        this.accountPageButton = page.getByRole('button', { name: 'Account' });
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async assertAccountPageSuccessful() {
        await this.accountPageButton.click();
        await expect(this.page).toHaveURL('/account');
    }

    async assertLoginPageSuccessful() {
        await expect(this.page).toHaveURL('/login');
    }

    async assertAccountPageLoaded() {
        await expect(this.logoutButton).toBeVisible();
        await expect(this.emailAddress).toBeVisible();
    }
}
