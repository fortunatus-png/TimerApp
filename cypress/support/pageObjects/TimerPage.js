class TimerPage {
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

    getFiveMinutes() {
        return cy.contains('5 Minutes');
    }

    getSlider() {
        return cy.get('#slider');
    }

    getHomeMessage() {
        return cy.get('.homeMessage');
    }

    getSVGFigure() {
        return cy.get('.figure-svg');
    }

    getHeader() {
        return cy.get('h1');
    }

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    assertLoginSuccessful() {
        cy.location('pathname').should('eq', '/');
    }

    assertSessionSuccessful() {
        this.getSVGFigure().should('be.visible');
        cy.location('pathname').should('eq', '/session');
    }

    assertTimerPageSuccessful() {
        this.getTimerButton().click();
        cy.location('pathname').should('eq', '/timer');
    }

    getTimerPageElements() {
        this.getSlider().should('be.visible');
        this.getStartButton().should('be.visible');
        this.getSVGFigure().should('be.visible');
        this.getFiveMinutes().should('be.visible');
    }

    setupTime() {
        this.getSlider().invoke("val", 25).trigger("change");
        this.getSlider().should('have.value', '25');
    }

    setupMaxTime() {
        this.getSlider().invoke("val", 180).trigger("change");
        this.getSlider().should('have.value', '180');
    }
}

export default TimerPage;