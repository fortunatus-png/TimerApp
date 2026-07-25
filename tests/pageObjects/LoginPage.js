import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async assertLoginPageSuccessful() {
        await expect(this.page).toHaveURL('/');
    }

    async assertErrorMessage(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}
