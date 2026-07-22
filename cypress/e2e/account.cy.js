/// <reference types="cypress" />
import AccountPage from '../support/pageObjects/AccountPage'
import { AUTH } from '../support/testData'

describe("Account", () => {
    const accountPage = new AccountPage();
    beforeEach("Visit account page", () => {
        accountPage.visitLoginPage();
        accountPage.login(AUTH.email, AUTH.password);
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