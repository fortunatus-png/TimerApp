import { expect } from '@playwright/test';

export class TimerPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

        this.timerPageButton = page.getByRole('button', { name: 'Timer' });
        this.slider = page.getByRole('slider');
        this.startButton = page.getByRole('button', { name: 'Start' });
        this.panda = page.locator('.figure-svg');
        this.studyPanda = page.getByRole('img');
        this.initialTime = page.getByText('5 Minutes');
        this.minutes25 = page.getByText('25 Minutes');
        this.minutes180 = page.getByRole('heading', { name: '180' });
        this.initialTimerHeader = page.getByRole('heading', { name: '5' });
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async assertTimerPageSuccessful() {
        await this.timerPageButton.click();
        await expect(this.page).toHaveURL('/timer');
    }

    async assertSessionPageSuccessful() {
        await expect(this.page).toHaveURL('/session');
    }

    async assertTimerPageLoaded() {
        await expect(this.slider).toBeVisible();
        await expect(this.startButton).toBeVisible();
        await expect(this.panda).toBeVisible();
        await expect(this.initialTime).toBeVisible();
    }

    async assertSessionPageLoaded() {
        await expect(this.initialTimerHeader).toBeVisible();
        await expect(this.studyPanda).toBeVisible();
    }
}
