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

        this.slider = page.getByRole('slider');
        this.startBtn = page.getByRole('button', { name: 'Start' });
        this.panda = page.locator('.figure-svg');
        this.pandaStudying = page.getByRole('img');
        this.initialTime = page.getByText('5 Minutes');
        this.initialTimeHead = page.getByRole('heading', { name: '5' });
        this.twentyfive = page.getByText('25 Minutes');
        this.hundredeighty = page.getByRole('heading', { name: '180' });
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

    async homeElementsVisible() {
        await expect(this.logo).toBeVisible();
        await expect(this.homeMessage).toBeVisible();
        await expect(this.panda).toBeVisible();
    }

    async timerElementsVisible() {
        await expect(this.slider).toBeVisible();
        await expect(this.startBtn).toBeVisible();
        await expect(this.panda).toBeVisible();
        await expect(this.initialTime).toBeVisible();
    }

    async sessionElementsVisible() {
        await expect(this.initialTimeHead).toBeVisible();
        await expect(this.pandaStudying).toBeVisible();
    }

    async gotoLoginPage() {
        await this.page.goto('/login');
    }

    async gotoHomePage() {
        await expect(this.page).toHaveURL('/');
    }

    async gotoTimerPage() {
        await expect(this.page).toHaveURL('/timer');
    }

    async gotoSessionPage() {
        await expect(this.page).toHaveURL('/session');
    }

    async gotoHistoryPage() {
        await expect(this.page).toHaveURL('/history');
    }

    async gotoAccountPage() {
        await expect(this.page).toHaveURL('/account');
    }

    async gotoCustomizePage() {
        await expect(this.page).toHaveURL('/customization');
    }
}