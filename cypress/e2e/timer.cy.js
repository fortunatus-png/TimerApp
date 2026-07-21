/// <reference types="cypress" />
import TimerPage from '../support/pageObjects/TimerPage'

describe("Timer", () => {
    const timerPage = new TimerPage();
    beforeEach("Visit timer page", () => {
        timerPage.visitLoginPage();
        timerPage.login('user@example.com', 'stringst');
        timerPage.assertTimerPageSuccessful();
    });

    it("Timerpage loads correctly", () => {
        timerPage.getTimerPageElements();
    });

    it("Set up the time with range slider", () => {
        timerPage.setupTime();
    });

    it("Start the timer with the minimum time", () => {
        timerPage.getStartButton().click();
        timerPage.getHeader().contains('5');
        timerPage.assertSessionSuccessful();
    });

    it("Start the timer with the maximum time", () => {
        timerPage.setupMaxTime();
        timerPage.getStartButton().click();
        timerPage.assertSessionSuccessful();
    });

    it("Timerpage stays on timer page after reload", () => {
        cy.reload();
        timerPage.getTimerPageElements();
    });
})