/// <reference types="cypress" />

describe("Session", () => {
    beforeEach("Visit session page", () => {
        cy.visit("/login");
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.contains('button', 'Log In').click();
        cy.contains('button', 'Timer').click();
        cy.contains('button', 'Start').click();
        cy.location('pathname').should('eq', '/session');
    });

    it("Sessionpage loads correctly", () => {
        cy.get('h1').contains('5');
        cy.get('.figure-svg').should('be.visible');
    });

    it("Pause the countdown timer", () => {
        cy.contains('button', '⏸').click();
        cy.contains('button', '▶').should('be.visible');
    });

    it("Resume the countdown timer", () => {
        cy.contains('button', '⏸').click();
        cy.contains('button', '▶').click();
        cy.contains('button', '⏸').should('be.visible');
    });

    it("Warning message when leaving the page during active session", () => {
        cy.contains('button', 'History').click();
        cy.contains('Your progress so far will be saved, but you won\'t be able to continue this session later.').should('be.visible');
        cy.contains('button', 'Continue').should('be.visible');
        cy.contains('Leave').should('be.visible');
    });

    it("Continue session after warning", () => {
        cy.contains('button', 'History').click();
        cy.contains('button', 'Continue').click();
        cy.contains('Your progress so far will be saved, but you won\'t be able to continue this session later.').should('not.exist');
        cy.contains('button', '⏸').should('be.visible');
    });

    it("Leave session after warning", () => {
        cy.contains('button', 'History').click();
        cy.contains('button', 'Leave').click();
        cy.location('pathname').should('eq', '/history');
    });

    // it("Session completes successfully", () => {
    //     cy.wait(310000);
    //     cy.contains("🎉 Great job!").should("be.visible");
    //     cy.contains("You studied for 5 minutes!").should("be.visible");
    //     cy.contains("button", "Start new session").should("be.visible");
    // });

    // it("Start new session after completion", () => {
    //     cy.wait(320000);
    //     cy.contains("🎉 Great job!").should("be.visible");
    //     cy.contains("You studied for 5 minutes!").should("be.visible");
    //     cy.contains("button", "Start new session").click();
    //     cy.location('pathname').should('eq', '/timer');
    // });
})