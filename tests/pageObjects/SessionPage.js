import { expect } from '@playwright/test';

export class SessionPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

        this.timerPageButton = page.getByRole('button', { name: 'Timer' });
        this.historyPageButton = page.getByRole('button', { name: 'History' });
        this.slider = page.getByRole('slider');
        this.startButton = page.getByRole('button', { name: 'Start' });
        this.panda = page.locator('.figure-svg');
        this.studyPanda = page.getByRole('img');
        this.initialTime = page.getByText('5 Minutes');
        this.minutes25 = page.getByText('25 Minutes');
        this.minutes180 = page.getByRole('heading', { name: '180' });
        this.initialTimerHeader = page.getByRole('heading', { name: '5' });

        this.pauseButton = page.getByRole('button', { name: '⏸' });
        this.playButton = page.getByRole('button', { name: '▶' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.leaveButton = page.getByRole('button', { name: 'Leave' });
        this.timeout = page.getByText('0:00');
        this.congratHeader = page.getByRole('heading', { name: '🎉 Great job!' });
        this.studiedTime = page.getByText('You studied for 5 minutes!');
        this.newSessionStartButton = page.getByRole('button', { name: 'Start new session' });
        this.warningMessage = page.getByText('Your progress so far will be saved, but you won\'t be able to continue this session later.');
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async visitHistoryPage() {
        await this.page.goto('/history');
    }

    async assertTimerPageSuccessful() {
        await expect(this.page).toHaveURL('/timer');
    }

    async assertSessionPageSuccessful() {
        await this.timerPageButton.click();
        await this.startButton.click();
        await expect(this.page).toHaveURL('/session');
    }

    async assertHistoryPageSuccessful() {
        await expect(this.page).toHaveURL('/history');
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

    async assertSessionPageCompletedLoaded() {
        await expect(this.timeout).toBeVisible({ timeout: 305000 });
        await expect(this.congratHeader).toBeVisible();
        await expect(this.studiedTime).toBeVisible();
        await expect(this.newSessionStartButton).toBeVisible();
    }
}
