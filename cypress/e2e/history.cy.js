/// <reference types="cypress" />

describe("History", () => {
    beforeEach("Visit history page", () => {
        cy.visit("/login");
        cy.get('[type="email"]').type("user@example.com");
        cy.get('[type="password"]').type("stringst");
        cy.get('[type="button"]').contains("Log In").click();
        cy.contains('button', 'History').click();
        cy.location('pathname').should('eq', '/history');
    });

    it("Historypage loads correctly", () => {
        cy.get('#heatmap-wrapper').should('be.visible');
        cy.get('#month-navigation').should('be.visible');
    });

    it("Navigeate through months", () => {
        cy.get('#month-navigation h3').then(($el) => {
            const currentMonth = $el.text();
            cy.get('#prevBtn').click();

            cy.get('#month-navigation h3').should(($newEl) => {
                expect($newEl.text()).not.to.eq(currentMonth);
            });

            cy.get('#nextBtn').click();
            cy.get('#nextBtn').click();
            cy.get('#month-navigation h3').should(($newEl) => {
                expect($newEl.text()).not.to.eq(currentMonth);
            });
        });
    });

    it("Historypage stays on history page after reload", () => {
        cy.reload();
        cy.get('#heatmap-wrapper').should('be.visible');
        cy.get('#month-navigation').should('be.visible');
    });

    it("Historypage stays on history page after reload", () => {
        cy.reload();
        cy.location("pathname").should("eq", "/history");
        cy.get("#heatmap-wrapper").should("be.visible");
        cy.get("#month-navigation").should("be.visible");
    });

    // it("Heatmap shows correct color for study time", () => {
    //     cy.contains("button", "Timer").click();
    //     cy.location("pathname").should("eq", "/timer");
    //     cy.get('[type="button"]').contains("Start").click();

    //     cy.wait(65000);
    //     cy.contains("button", "History").click();
        
    //     cy.get("body").then(($body) => {
    //         if ($body.find('button:contains("Leave")').length > 0) {
    //             cy.contains("button", "Leave").click();
    //         }
    //     });
        
    //     cy.location("pathname").should("eq", "/history");
    //     cy.reload();

    //     cy.window().then((win) => {
    //         const today = new Date().getDate();
    //         const currentHour = new Date().getHours();
    //         const adjustedHour = (currentHour - 2 + 24) % 24;
    //         const cellIndex = (today - 1) * 24 + adjustedHour;

    //         cy.get(".heatCell")
    //             .eq(cellIndex)
    //             .should(($cell) => {
    //                 const bgColor = getComputedStyle($cell[0]).backgroundColor;
    //                 expect(bgColor).to.eq("rgb(200, 230, 201)");
    //             });
    //     });
    // });
})