class SessionPage {
    visitLoginPage() {
        cy.visit('/login');
    }

    getEmailInput() {
        return cy.get('[type="email"]');
    }

    getPasswordInput() {
        return cy.get('[type="password"]');
    }

    getLoginButton() {
        return cy.contains('button', 'Log In');
    }

    getTimerButton() {
        return cy.contains('button', 'Timer');
    }

    getStartButton() {
        return cy.contains('button', 'Start');
    }

    getPauseButton() {
        return cy.contains('button', '⏸');
    }

    getPlayButton() {
        return cy.contains('button', '▶');
    }

    getHistoryButton() {
        return cy.contains('button', 'History');
    }

    getContinueButton() {
        return cy.contains('button', 'Continue');
    }

    getLeaveButton() {
        return cy.contains('button', 'Leave');
    }

    getNewSessionButton() {
        return cy.contains('button', 'Start new session');
    }

    getSVGFigure() {
        return cy.get('.figure-svg');
    }

    getHeader() {
        return cy.get('h1');
    }

    getFirstMessage() {
        return cy.contains("🎉 Great job!");
    }

    getSecondMessage() {
        return cy.contains("You studied for 5 minutes!");
    }


    getWarningMessage() {
        return cy.contains('Your progress so far will be saved, but you won\'t be able to continue this session later.');
    }

    getSessionPageElements() {
        this.getHeader().contains('5');
        this.getSVGFigure().should('be.visible');
    }

    getTimerPaused() {
        this.getPauseButton().click();
        this.getPlayButton().should('be.visible');
    }

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    assertLoginSuccessful() {
        cy.location('pathname').should('eq', '/');
    }

    assertHistoryPageSuccessful() {
        cy.location('pathname').should('eq', '/history');
    }

    assertSessionSuccessful() {
        this.getTimerButton().click();
        this.getStartButton().click();
        cy.location('pathname').should('eq', '/session');
    }

    assertTimerPageSuccessful() {
        this.getNewSessionButton().click();
        cy.location('pathname').should('eq', '/timer');
    }

    assertSessionCompleteMessage() {
        this.getFirstMessage().should("be.visible");
        this.getSecondMessage().should("be.visible");
        this.getNewSessionButton().should("be.visible");
    }
}

export default SessionPage;