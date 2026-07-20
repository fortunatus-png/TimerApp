/// <reference types="cypress" />

describe("Timer", () => {
    beforeEach("Visit timer page", () => {
        cy.visit("/login");
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.contains('button', 'Log In').click();
        cy.contains('button', 'Timer').click();
        cy.location('pathname').should('eq', '/timer');
    });

    it("Timerpage loads correctly", () => {
        cy.get('#slider').should('be.visible');
        cy.contains('button', 'Start').should('be.visible');
        cy.get('.figure-svg').should('be.visible');
        cy.contains('5 Minutes').should('be.visible');
    });

    it("Set up the time with range slider", () => {
        cy.get('#slider').invoke("val", 25).trigger("change");
        cy.get('#slider').should('have.value', '25');
    });

    it("Start the timer with the minimum time", () => {
        cy.contains('button', 'Start').click();
        cy.get('h1').contains('5');
        cy.get('.figure-svg').should('be.visible');
        cy.location('pathname').should('eq', '/session');
    });

    it("Start the timer with the maximum time", () => {
        cy.get('#slider').invoke('val', 180).trigger('change');
        cy.get('#slider').should('have.value', '180');
        cy.contains('button', 'Start').click();
        cy.get('.figure-svg').should('be.visible');
        cy.location('pathname').should('eq', '/session');
    });

    it("Timerpage stays on timer page after reload", () => {
        cy.reload();
        cy.get('#slider').should('be.visible');
        cy.contains('button', 'Start').should('be.visible');
        cy.get('.figure-svg').should('be.visible');
        cy.contains('5 Minutes').should('be.visible');
    });
})