import { expect } from '@playwright/test';

export class HistoryPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

        this.historyPageButton = page.getByRole('button', { name: 'History' });
        this.startButton = page.getByRole('button', { name: 'Start' });
        this.leaveButton = page.getByRole('button', { name: 'Leave' });

        this.heatmap = page.locator('#heatmap-wrapper');
        this.prevMonthBtn = page.locator('#prevBtn');
        this.nextMonthBtn = page.locator('#nextBtn');
        this.monthNav = page.locator('#month-navigation');
        this.monthTitle = page.locator('#month-navigation h3');
        this.cells = page.locator('.heatCell');
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async visitTimerPage() {
        await this.page.goto('/timer');
    }

    async assertHistoryPageSuccessful() {
        await this.historyPageButton.click();
        await expect(this.page).toHaveURL('/history');
    }

    async assertHistoryPageLoaded() {
        await expect(this.heatmap).toBeVisible();
        await expect(this.monthNav).toBeVisible();
    }

    async getCurrentMonth() {
        return await this.monthTitle.textContent();
    }

    async assertMonthChanged(originalMonth) {
        const newMonth = await this.getCurrentMonth();
        expect(newMonth).not.toBe(originalMonth);
    }

    async getShortStudySession() {
        await this.startButton.click();
        await this.page.waitForTimeout(63000);
        await this.historyPageButton.click();
        await this.leaveButton.click();
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
}
