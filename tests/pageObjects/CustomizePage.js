import { expect } from '@playwright/test';

export class CustomizePage {
    constructor(page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });

        this.customPageButton = page.getByRole('button', { name: 'Customize' });
        this.bgdColor = page.locator('#background-color-wish');
        this.resetButton = page.getByRole('button', { name: 'Reset Data' });
        this.colorPicker = page.locator('input[type="color"]');
    }

    async visitLoginPage() {
        await this.page.goto('/login');
    }

    async logIn(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async selectColor(hexColor) {
        await this.colorPicker.fill(hexColor);
    }

    async getBackgroundColor() {
        return await this.page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    }

    async expectBackgroundColor(expectedColor) {
        const bg = await this.getBackgroundColor();
        await expect(bg).toBe(expectedColor);
    }

    async expectBackgroundColorNot(expectedColor) {
        const bg = await this.getBackgroundColor();
        await expect(bg).not.toBe(expectedColor);
    }

    async assertCustomizePageSuccessful() {
        await this.customPageButton.click();
        await expect(this.page).toHaveURL('/customization');
    }

    async assertCustomizePageLoaded() {
        await expect(this.bgdColor).toBeVisible();
        await expect(this.resetButton).toBeVisible();
    }
}
