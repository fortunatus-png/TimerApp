class LoginPage {
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

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    loginWithEmail(email) {
        this.getEmailInput().type(email);
        this.getLoginButton().click();
    }

    loginWithPassword(password) {
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    assertLoginSuccessful() {
        cy.location('pathname').should('eq', '/');
    }

    assertErrorMessage(message) {
        cy.contains(message).should('be.visible');
    }
}

export default LoginPage;