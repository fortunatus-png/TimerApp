/// <reference types="cypress" />
import HomePage from '../support/pageObjects/HomePage'
import { AUTH } from '../support/testData'

describe("Home", () => {
    const homePage = new HomePage();
    beforeEach("On home page", () => {
        homePage.visitLoginPage();
        homePage.login(AUTH.email, AUTH.password);
        homePage.assertLoginSuccessful();
    });

    it("Homepage loads correctly", () => {
        homePage.getHomeElements();
    });

    it("Navigate to Timer page", () => {
        homePage.assertTimerPageSuccessful();
    });

    it("Navigate to History page", () => {
        homePage.assertHistoryPageSuccessful();
    });

    it("Navigate to Account page", () => {
        homePage.assertAccountPageSuccessful();
    });

    it("Navigate to Customize page", () => {
        homePage.assertCustomizePageSuccessful();
    });

    it("Homepage stays on home page after reload", () => {
        cy.reload();
        homePage.getHomeElements();
    });
})