/// <reference types="cypress" />

describe("Signup", () => {
    beforeEach("Visit login page", () => {
        cy.visit("http://localhost:5173/login");
    });

    it("Successful signup with valid credentials", () => {
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
    });
})