class CustomizePage {
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

    getResetDataButton() {
        return cy.contains('button', 'Reset Data');
    }

    getCustomizeButton() {
        return cy.contains('button', 'Customize');
    }

    getBackgroundColor() {
        return cy.get('#background-color-wish');
    }

    getColor() {
        return cy.get('input[type="color"]');
    }

    login(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }

    assertCustomizePageSuccessful() {
        this.getCustomizeButton().click();
        cy.location('pathname').should('eq', '/customization');
    }

    assertCustomizePageElements() {
        this.getBackgroundColor().should("be.visible");
        this.getResetDataButton().should("be.visible");
    }

    assertExpectColor(newBg) {
        expect(newBg).to.eq("rgb(255, 0, 0)");
    }
}

export default CustomizePage;