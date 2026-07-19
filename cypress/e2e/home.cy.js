/// <reference types="cypress" />

describe("Home", () => {
    beforeEach("On home page", () => {
        cy.visit("http://localhost:5173/login");
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
        cy.url().should('include', '/')
    });

    it("Homepage loads correctly", () => {
        cy.contains('Study Panda').should('be.visible');
        cy.get('.homeMessage').should('be.visible');
        cy.get('.figure-svg').should('be.visible');
    });

    it("Navigate to Timer page", () => {
        cy.contains('button', 'Timer').click();
        cy.url().should('include', '/timer')
    });

    it("Navigate to History page", () => {
        cy.contains('button', 'History').click();
        cy.url().should('include', '/history')
    });

    it("Navigate to Account page", () => {
        cy.contains('button', 'Account').click();
        cy.url().should('include', '/account')
    });

    it("Navigate to Customize page", () => {
        cy.contains('button', 'Customize').click();
        cy.url().should('include', '/customization')
    });

    it("Homepage stays on home page after reload", () => {
        cy.reload();
        cy.contains('Study Panda').should('be.visible');
        cy.get('.homeMessage').should('be.visible');
        cy.get('.figure-svg').should('be.visible');
    });
})