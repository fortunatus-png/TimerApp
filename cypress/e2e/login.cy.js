/// <reference types="cypress" />

describe("Login", () => {
    beforeEach("Visit login page", () => {
        cy.visit("/login");
    });

    it("Successful login with valid credentials", () => {
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
        cy.location('pathname').should('eq', '/');
    });

    it("Failed login with wrong email", () => {
        cy.get('[type="email"]').type("hos2t@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
        cy.contains('Invalid credentials').should('be.visible');
    });

    it("Failed login with an empty email field", () => {
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
        cy.contains('Email is required').should('be.visible');
    });

    it("Failed login with wrong password", () => {
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringsttt");
        cy.get('[type="button"]').contains("Log In").click();
        cy.contains('Invalid credentials').should('be.visible');
    });

    it("Failed login with an empty password field", () => {
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="button"]').contains("Log In").click();
        cy.contains('Password is required').should('be.visible');
    });
})