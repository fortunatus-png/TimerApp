class AccountPage {
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

    getAccountButton() {
        return cy.contains('button', 'Account');
    }

    getLogoutButton() {
        return cy.contains('button', 'Log Out');
    }

    getEmail() {
        return cy.get('#email');
    }

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    assertAccountPageSuccessful() {
        this.getAccountButton().click();
        cy.location('pathname').should('eq', '/account');
    }

    assertLoginPageSuccessful() {
        cy.location('pathname').should('eq', '/login');
    }

    assertAccountPageElements() {
        this.getLogoutButton().should("be.visible");
        this.getEmail().should("be.visible");
    }
}

export default AccountPage;