/// <reference types="cypress" />

describe("Account", () => {
    beforeEach("Visit account page", () => {
        cy.visit("/login");
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
        cy.contains('button', 'Account').click();
        cy.location('pathname').should('eq', '/account');
    });

    it("Accountpage loads correctly", () => {
        cy.contains('button', 'Log Out').should('be.visible');
        cy.get('#email').should('be.visible');
    });

    it("Log out is possible", () => {
        cy.contains('button', 'Log Out').click();
        cy.location('pathname').should('eq', '/login');
    });

    it("Accountpage stays on account page after reload", () => {
        cy.reload();
        cy.contains('button', 'Log Out').should('be.visible');
        cy.get('#email').should('be.visible');
    });
})