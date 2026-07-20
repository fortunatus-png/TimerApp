/// <reference types="cypress" />

describe("Customize", () => {
    beforeEach("Visit customize page", () => {
        cy.visit("/login");
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
        cy.contains('button', 'Customize').click();
        cy.location('pathname').should('eq', '/customization');
    });

    it("Customizepage loads correctly", () => {
        cy.get('#background-color-wish').should('be.visible');
        cy.contains('button', 'Reset Data').should('be.visible');
    });

    it("Choose a color for the background", () => {
        let oldBg;
        cy.document().then((doc) => {
            oldBg = getComputedStyle(doc.body).backgroundColor;
        });

        cy.get('input[type="color"]').invoke("val", "rgb(255, 0, 0)").trigger("change");
        cy.document().then((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            expect(newBg).to.eq("rgb(255, 0, 0)");
            expect(newBg).not.to.eq(oldBg);
        });
    });

    it("Reset background to default color", () => {
        cy.get('input[type="color"]').invoke("val", "rgb(255, 0, 0)").trigger("change");
        cy.document().then((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            expect(newBg).to.eq("rgb(255, 0, 0)");
        });

        cy.get("button").contains("Reset Data").click();
        cy.document().then((doc) => {
            const resetBg = getComputedStyle(doc.body).backgroundColor;
            expect(resetBg).not.to.eq("rgb(255, 0, 0)");
        });
    });

    it("Chosen color persists after reload", () => {
        cy.get('input[type="color"]').invoke("val", "rgb(255, 0, 0)").trigger("change");
        cy.document().then((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            expect(newBg).to.eq("rgb(255, 0, 0)");
        });

        cy.reload();
        cy.document().should((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            expect(newBg).to.eq("rgb(255, 0, 0)");
        });
    });

    it("Customizepage stays on customize page after reload", () => {
        cy.reload();
        cy.get('#background-color-wish').should('be.visible');
        cy.contains('button', 'Reset Data').should('be.visible');
    });
})