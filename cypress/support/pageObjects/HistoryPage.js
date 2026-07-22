class HistoryPage {
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

    getMonthTitle() {
        return cy.get('#month-navigation h3');
    }

    getHistoryButton() {
        return cy.contains('button', 'History');
    }

    getTimerButton() {
        return cy.contains('button', 'Timer');
    }

    getStartButton() {
        return cy.contains('button', 'Start');
    }

    getLeaveButton() {
        return cy.contains('button', 'Leave');
    }

    getPrevButton() {
        return cy.get('#prevBtn');
    }

    getNextButton() {
        return cy.get('#nextBtn');
    }

    getHeatmap() {
        return cy.get('#heatmap-wrapper');
    }

    getMonthNavigation() {
        return cy.get('#month-navigation');
    }

    getHeatCell() {
        return cy.get('.heatCell');
    }

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    assertLoginSuccessful() {
        cy.location('pathname').should('eq', '/');
    }

    assertHistorySuccessful() {
        cy.location('pathname').should('eq', '/history');
    }

    assertHistoryPageSuccessful() {
        this.getHistoryButton().click();
        cy.location('pathname').should('eq', '/history');
    }

    assertTimerPageSuccessful() {
        this.getTimerButton().click();
        cy.location('pathname').should('eq', '/timer');
    }

    assertHistoryPageElements() {
        this.getHeatmap().should("be.visible");
        this.getMonthNavigation().should("be.visible");
    }
}

export default HistoryPage;