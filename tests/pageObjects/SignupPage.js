import { expect } from '@playwright/test';

export class SignupPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.signupBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async signUp(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signupBtn.click();
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async assertSignupSuccessful() {
        await expect(this.page).toHaveURL('/');
    }

    async assertErrorMessage(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}
