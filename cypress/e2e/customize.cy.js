/// <reference types="cypress" />
import CustomizePage from '../support/pageObjects/CustomizePage'

describe("Customize", () => {
    const customizePage = new CustomizePage();
    beforeEach("Visit customize page", () => {
        customizePage.visitLoginPage();
        customizePage.login('user@example.com', 'stringst');
        customizePage.assertCustomizePageSuccessful();
    });

    it("Customizepage loads correctly", () => {
        customizePage.assertCustomizePageElements();
    });

    it("Choose a color for the background", () => {
        let oldBg;
        cy.document().then((doc) => {
            oldBg = getComputedStyle(doc.body).backgroundColor;
        });

        customizePage.getColor().invoke("val", "rgb(255, 0, 0)").trigger("change");
        cy.document().then((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            customizePage.assertExpectColor(newBg);
            expect(newBg).not.to.eq(oldBg);
        });
    });

    it("Reset background to default color", () => {
        customizePage.getColor().invoke("val", "rgb(255, 0, 0)").trigger("change");
        cy.document().then((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            customizePage.assertExpectColor(newBg);
        });

        cy.get("button").contains("Reset Data").click();
        cy.document().then((doc) => {
            const resetBg = getComputedStyle(doc.body).backgroundColor;
            expect(resetBg).not.to.eq("rgb(255, 0, 0)");
        });
    });

    it("Chosen color persists after reload", () => {
        customizePage.getColor().invoke("val", "rgb(255, 0, 0)").trigger("change");
        cy.document().then((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            customizePage.assertExpectColor(newBg);
        });

        cy.reload();
        cy.document().should((doc) => {
            const newBg = getComputedStyle(doc.body).backgroundColor;
            customizePage.assertExpectColor(newBg);
        });
    });

    it("Customizepage stays on customize page after reload", () => {
        cy.reload();
        customizePage.assertCustomizePageElements();
    });
})