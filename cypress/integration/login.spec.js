/// <reference types="cypress" />

context('Login Page', () => {
  before(() => {
    cy.visit('/login');
  });

  describe('Test for login component', () => {
    it('checks that component exists', () => {
      cy.get('[data-cy=login-form]').should('exist');
    });

    it('checks that incorrect login errors out', () => {
      cy.get('[data-cy=login-email]').type('sss@email.com');
      cy.get('[data-cy=login-password]').type('sssss');
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=login-failure]').should('exist');
    });

    it('checks that user can login', () => {
      cy.get('[data-cy=login-email]').clear().type('mrin@email.com');
      cy.get('[data-cy=login-password]').clear().type('password');
      cy.get('[data-cy=login-submit]').click();
      cy.get('[data-cy=dashboard-header]').should('exist');
    });
  });

  // https://on.cypress.io/interacting-with-elements
});
