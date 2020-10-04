context('Login Tests', () => {
    it('makes a wrong login attemp', () => {
        cy.screenshot();
        cy.visit('https://habitica.com/static/home')
        cy.get('.navbar > .btn').click();
        cy.wait(500);
        cy.get('#usernameInput').type('fake@email.com').should('have.value', 'fake@email.com');
        cy.get('#passwordInput').type('fake@email.com');

        cy.get('.btn-info[type="submit"]').click()

        cy.contains("Uh-oh - your email address / username or password is incorrect.").should('be.visible')
        cy.screenshot();
    })
});
