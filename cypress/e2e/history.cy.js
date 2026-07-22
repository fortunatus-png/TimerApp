/// <reference types="cypress" />
import HistoryPage from '../support/pageObjects/HistoryPage'

describe("History", () => {
    const historyPage = new HistoryPage();
    beforeEach("Visit history page", () => {
        historyPage.visitLoginPage();
        historyPage.login('user@example.com', 'stringst');
        historyPage.assertHistoryPageSuccessful();
    });

    it("Historypage loads correctly", () => {
        historyPage.assertHistoryPageElements();
    });

    it("Navigeate through months", () => {
        historyPage.getMonthTitle().then(($el) => {
            const currentMonth = $el.text();
            historyPage.getPrevButton().click();

            historyPage.getMonthTitle().should(($newEl) => {
                expect($newEl.text()).not.to.eq(currentMonth);
            });

            historyPage.getNextButton().click();
            historyPage.getNextButton().click();
            historyPage.getMonthTitle().should(($newEl) => {
                expect($newEl.text()).not.to.eq(currentMonth);
            });
        });
    });

    it("Historypage stays on history page after reload", () => {
        cy.reload();
        historyPage.assertHistoryPageElements();
    });

    // it("Heatmap shows correct color for study time", () => {
    //     historyPage.assertTimerPageSuccessful();
    //     historyPage.getStartButton().click();

    //     cy.wait(65000);
    //     historyPage.getHistoryButton().click();

    //     cy.get("body").then(($body) => {
    //         if ($body.find('button:contains("Leave")').length > 0) {
    //             historyPage.getLeaveButton().click();
    //         }
    //     });

    //     historyPage.assertHistorySuccessful();
    //     cy.reload();

    //     cy.window().then((win) => {
    //         const today = new Date().getDate();
    //         const currentHour = new Date().getHours();
    //         const adjustedHour = (currentHour - 2 + 24) % 24;
    //         const cellIndex = (today - 1) * 24 + adjustedHour;

    //         historyPage.getHeatCell()
    //             .eq(cellIndex)
    //             .should(($cell) => {
    //                 const bgColor = getComputedStyle($cell[0]).backgroundColor;
    //                 expect(bgColor).to.eq("rgb(200, 230, 201)");
    //             });
    //     });
    // });
})