class HomePage {
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

    getTimeButton() {
        return cy.contains('button', 'Timer');
    }

    getHistoryButton() {
        return cy.contains('button', 'History');
    }

    getAccountButton() {
        return cy.contains('button', 'Account');
    }

    getCustomizeButton() {
        return cy.contains('button', 'Customize');
    }

    getStudyPanda() {
        return cy.contains('Study Panda');
    }

    getHomeMessage() {
        return cy.get('.homeMessage');
    }

    getSVGFigure() {
        return cy.get('.figure-svg');
    }

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    assertLoginSuccessful() {
        cy.location('pathname').should('eq', '/');
    }

    assertTimerPageSuccessful() {
        this.getTimeButton().click();
        cy.location('pathname').should('eq', '/timer');
    }

    assertHistoryPageSuccessful() {
        this.getHistoryButton().click();
        cy.location('pathname').should('eq', '/history');
    }

    assertAccountPageSuccessful() {
        this.getAccountButton().click();
        cy.location('pathname').should('eq', '/account');
    }

    assertCustomizePageSuccessful() {
        this.getCustomizeButton().click();
        cy.location('pathname').should('eq', '/customization');
    }

    getHomeElements() {
        this.getStudyPanda().should('be.visible');
        this.getHomeMessage().should('be.visible');
        this.getSVGFigure().should('be.visible');
    }
}

export default HomePage;