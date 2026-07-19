/// <reference types="cypress" />

describe("Signup", () => {
    beforeEach("Visit login page", () => {
        cy.visit("/login");
    });

    it("Successful signup with valid credentials", () => {
        cy.get('[type="email"]').type("user1@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
        cy.url().should('include', '/')
    });

    it("Failed signup with invalid email format", () => {
        cy.get('[type="email"]').type("adminexample.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
        cy.contains('Enter a valid email (e.g., name@domain.com)').should('be.visible');
    });

    it("Failed signup with an empty email field", () => {
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
        cy.contains('Email is required').should('be.visible');
    });

    it("Failed signup with email that already exists", () => {
        cy.get('[type="email"]').type("admin@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
        cy.contains('Email already exists').should('be.visible');
    });

    it("Failed signup with password too short", () => {
        cy.get('[type="email"]').type("host@example.com");
        cy.get('[type="password"]').type("strings");
        cy.get('[type="button"]').contains("Sign Up").click();
        cy.contains('Password must be at least 8 characters').should('be.visible');
    });

    it("Failed signup with an empty password field", () => {
        cy.get('[type="email"]').type("host@example.com");
        cy.get('[type="button"]').contains("Sign Up").click();
        cy.contains('Password is required').should('be.visible');
    });
})