import { expect } from '@playwright/test';

export class StudyPandaPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.signupBtn = page.getByRole('button', { name: 'Sign up' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

        this.logo = page.getByText('Study Panda');
        this.homeMessage = page.locator('.homeMessage');
        this.panda = page.locator('.figure-svg');

        this.timerPageBtn = page.getByRole('button', { name: 'Timer' });
        this.historyPageBtn = page.getByRole('button', { name: 'History' });
        this.accountPageBtn = page.getByRole('button', { name: 'Account' });
        this.customPageBtn = page.getByRole('button', { name: 'Customize' });
    }

    async gotoLoginPage() {
        await this.page.goto('/login');
    }

    async gotoHomePage() {
        await expect(this.page).toHaveURL('/');
    }

    async signUp(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signupBtn.click();
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async logoMessageVisible() {
        await expect(this.logo).toBeVisible();
        await expect(this.homeMessage).toBeVisible();
    }

    async pandaVisible() {
        await expect(this.panda).toBeVisible();
    }

}