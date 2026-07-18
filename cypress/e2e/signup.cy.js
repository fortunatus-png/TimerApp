/// <reference types="cypress" />

describe("Signup", () => {
    beforeEach("Visit login page", () => {
        cy.visit("http://localhost:5173/login");
    });

    it("Successful signup with valid credentials", () => {
        cy.get('[type="email"]').type("admin@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
    });

    it("Failed signup with invalid email format", () => {
        cy.get('[type="email"]').type("adminexample.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
    });

    it("Failed signup with an empty email field", () => {
        cy.get('[type="email"]').type("");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
    });

    it("Failed signup with email that already exists", () => {
        cy.get('[type="email"]').type("admin@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Sign Up").click();
    });

    it("Failed signup with password too short", () => {
        cy.get('[type="email"]').type("host@example.com");
        cy.get('[type="password"]').type("strings");
        cy.get('[type="button"]').contains("Sign Up").click();
    });

    it.only("Failed signup with an empty password field", () => {
        cy.get('[type="email"]').type("host@example.com");
        cy.get('[type="password"]').type("");
        cy.get('[type="button"]').contains("Sign Up").click();
    });
})