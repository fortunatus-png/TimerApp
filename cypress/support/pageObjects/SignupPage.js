class SignupPage {
    visitSignupPage() {
        cy.visit('/login');
    }

    getEmailInput() {
        return cy.get('[type="email"]');
    }

    getPasswordInput() {
        return cy.get('[type="password"]');
    }

    getSignupButton() {
        return cy.contains('button', 'Sign Up');
    }

    signup(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getSignupButton().click();
    }

    signupWithEmail(email) {
        this.getEmailInput().type(email);
        this.getSignupButton().click();
    }

    signupWithPassword(password) {
        this.getPasswordInput().type(password);
        this.getSignupButton().click();
    }

    assertSignupSuccessful() {
        cy.location('pathname').should('eq', '/');
    }

    assertErrorMessage(message) {
        cy.contains(message).should('be.visible');
    }
}

export default SignupPage;