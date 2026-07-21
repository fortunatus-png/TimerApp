/// <reference types="cypress" />
import SessionPage from '../support/pageObjects/SessionPage'

describe("Session", () => {
    const sessionPage = new SessionPage();
    beforeEach("Visit session page", () => {
        sessionPage.visitLoginPage();
        sessionPage.login('user@example.com', 'stringst');
        sessionPage.assertSessionSuccessful();
    });

    it("Sessionpage loads correctly", () => {
        sessionPage.getSessionPageElements();
    });

    it("Pause the countdown timer", () => {
        sessionPage.getPauseButton().click();
        sessionPage.getPlayButton().should('be.visible');
    });

    it("Resume the countdown timer", () => {
        sessionPage.getPauseButton().click();
        sessionPage.getPlayButton().click();
        sessionPage.getPauseButton().should('be.visible');
    });

    it("Warning message when leaving the page during active session", () => {
        sessionPage.getHistoryButton().click();
        sessionPage.getWarningMessage().should('be.visible');
        sessionPage.getContinueButton().should('be.visible');
        sessionPage.getLeaveButton().should('be.visible');
    });

    it("Continue session after warning", () => {
        sessionPage.getHistoryButton().click();
        sessionPage.getContinueButton().click();
        sessionPage.getWarningMessage().should('not.exist');
        sessionPage.getPauseButton().should('be.visible');
    });

    it("Leave session after warning", () => {
        sessionPage.getHistoryButton().click();
        sessionPage.getLeaveButton().click();
        sessionPage.assertHistoryPageSuccessful();
    });

    // it("Session completes successfully", () => {
    //     cy.wait(310000);
    //     sessionPage.assertSessionCompleteMessage();
    // });

    // it("Start new session after completion", () => {
    //     cy.wait(310000);
    //     sessionPage.assertSessionCompleteMessage();
    //     sessionPage.assertTimerPageSuccessful();
    // });
})