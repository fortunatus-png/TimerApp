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

    getSignupButton() {
        return cy.contains('button', 'Sign Up');
    }

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    signup(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getSignupButton().click();
    }

    assertLoginSuccessful() {
        cy.location('pathname').should('eq', '/');
    }

    assertErrorMessage(message) {
        cy.contains(message).should('be.visible');
    }
}

export default LoginPage;