import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

        this.logo = page.getByText('Study Panda');
        this.homeMessage = page.locator('.homeMessage');
        this.panda = page.locator('.figure-svg');

        this.timerPageButton = page.getByRole('button', { name: 'Timer' });
        this.historyPageButton = page.getByRole('button', { name: 'History' });
        this.accountPageButton = page.getByRole('button', { name: 'Account' });
        this.customPageButton = page.getByRole('button', { name: 'Customize' });
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async assertHomePageLoaded() {
        await expect(this.logo).toBeVisible();
        await expect(this.homeMessage).toBeVisible();
        await expect(this.panda).toBeVisible();
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async assertHomePageSuccessful() {
        await expect(this.page).toHaveURL('/');
    }

    async assertLoginSuccessful() {
        await expect(this.page).toHaveURL('/login');
    }

    async assertTimerPageSuccessful() {
        await expect(this.page).toHaveURL('/timer');
    }

    async assertHistoryPageSuccessful() {
        await expect(this.page).toHaveURL('/history');
    }

    async assertAccountPageSuccessful() {
        await expect(this.page).toHaveURL('/account');
    }

    async assertCustomizePageSuccessful() {
        await expect(this.page).toHaveURL('/customization');
    }
}