it('Random_Palette', () => {
        cy.visit('https://msalcedo19.github.io/visual-regression/');
        cy.get('#actions > button:first-child').click();
        cy.screenshot('img1');

        cy.get('#actions > button:first-child').click();
        cy.screenshot('img2');
})
