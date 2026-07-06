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
        this.pandaStudying = page.getByRole('img');
        this.initialTime = page.getByText('5 Minutes');
        this.initialTimeHead = page.getByRole('heading', { name: '5' });
        this.twentyfive = page.getByText('25 Minutes');
        this.hundredeighty = page.getByRole('heading', { name: '180' });

        this.pauseBtn = page.getByRole('button', { name: '⏸' });
        this.playBtn = page.getByRole('button', { name: '▶' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.leaveBtn = page.getByRole('button', { name: 'Leave' });
        this.warningMessage = page.getByText('Your progress so far will be saved, but you won\'t be able to continue this session later.');

        this.timeout = page.getByText('0:00');
        this.congratHead = page.getByRole('heading', { name: '🎉 Great job!' });
        this.studiedTime = page.getByText('You studied for 5 minutes!');
        this.newStartBtn = page.getByRole('button', { name: 'Start new session' });

        this.heatmap = page.locator('#heatmap-wrapper');
        this.prevMonthBtn = page.locator('#prevBtn');
        this.nextMonthBtn = page.locator('#nextBtn');
        this.monthNav = page.locator('#month-navigation');
        this.monthTitle = page.locator('#month-navigation h3');
        this.cells = page.locator('.heatCell');

        this.bgdColor = page.locator('#background-color-wish');
        this.resetBtn = page.getByRole('button', { name: 'Reset Data' });

        this.colorPicker = page.locator('input[type="color"]');
        this.container = page.locator('#background-color-wish');

        this.logOut = page.getByRole('button', { name: 'Log Out' });
        this.emailAddress = page.locator('#email');
    }

    async signUp(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signupBtn.click();
    }

    async logIn(email, password) {
        await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }


    async getHomeElements() {
        await expect(this.logo).toBeVisible();
        await expect(this.homeMessage).toBeVisible();
        await expect(this.panda).toBeVisible();
    }

    async getTimerElements() {
        await expect(this.slider).toBeVisible();
        await expect(this.startBtn).toBeVisible();
        await expect(this.panda).toBeVisible();
        await expect(this.initialTime).toBeVisible();
    }

    async getSessionElements() {
        await expect(this.initialTimeHead).toBeVisible();
        await expect(this.pandaStudying).toBeVisible();
    }

    async getSessionCompletedElements() {
        await expect(this.timeout).toBeVisible({ timeout: 305000 });
        await expect(this.congratHead).toBeVisible();
        await expect(this.studiedTime).toBeVisible();
        await expect(this.newStartBtn).toBeVisible();
    }

    async getCurrentMonth() {
        return await this.monthTitle.textContent();
    }

    async expectMonthChanged(originalMonth) {
        const newMonth = await this.getCurrentMonth();
        expect(newMonth).not.toBe(originalMonth);
    }

    async getShortStudySession() {
        await this.startBtn.click();
        await this.page.waitForTimeout(63000);
        await this.historyPageBtn.click();
        await this.leaveBtn.click();
    }

    async getCellForToday() {
        const today = new Date().getDate();
        const currentHour = new Date().getHours();
        const adjustedHour = (currentHour - 2 + 24) % 24;
        const cellIndex = (today - 1) * 24 + adjustedHour;
        return this.cells.nth(cellIndex);
    }

    async getCellColor(cell) {
        return await cell.evaluate(el => getComputedStyle(el).backgroundColor);
    }

    async getCustomizeElements() {
        await expect(this.bgdColor).toBeVisible();
        await expect(this.resetBtn).toBeVisible();
    }

    async selectColor(hexColor) {
        await this.colorPicker.fill(hexColor);
    }

    async getBackgroundColor() {
        return await this.page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    }

    async expectBackgroundColor(expectedColor) {
        const bg = await this.getBackgroundColor();
        expect(bg).toBe(expectedColor);
    }

    async expectBackgroundColorNot(expectedColor) {
        const bg = await this.getBackgroundColor();
        expect(bg).not.toBe(expectedColor);
    }

    async expectColorPickerValue(expectedValue) {
        await expect(this.colorPicker).toHaveValue(expectedValue);
    }

    async gotoLoginPage() {
        await this.page.goto('/login');
    }

    async gotoHistoryPage() {
        await this.page.goto('/history');
    }

    async gotoTimerPage() {
        await this.page.goto('/timer');
    }

    async expectHomePage() {
        await expect(this.page).toHaveURL('/');
    }

    async expectLoginPage() {
        await expect(this.page).toHaveURL('/login');
    }

    async expectTimerPage() {
        await expect(this.page).toHaveURL('/timer');
    }

    async expectSessionPage() {
        await expect(this.page).toHaveURL('/session');
    }

    async expectHistoryPage() {
        await expect(this.page).toHaveURL('/history');
    }

    async expectAccountPage() {
        await expect(this.page).toHaveURL('/account');
    }

    async expectCustomizePage() {
        await expect(this.page).toHaveURL('/customization');
    }
}