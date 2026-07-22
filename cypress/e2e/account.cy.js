/// <reference types="cypress" />
import AccountPage from '../support/pageObjects/AccountPage'

describe("Account", () => {
    const accountPage = new AccountPage();
    beforeEach("Visit account page", () => {
        accountPage.visitLoginPage();
        accountPage.login('user@example.com', 'stringst');
        accountPage.assertAccountPageSuccessful();
    });

    it("Accountpage loads correctly", () => {
        accountPage.assertAccountPageElements();
    });

    it("Log out is possible", () => {
        accountPage.getLogoutButton().click();
        accountPage.assertLoginPageSuccessful();
    });

    it("Accountpage stays on account page after reload", () => {
        cy.reload();
        accountPage.assertAccountPageElements();
    });
})