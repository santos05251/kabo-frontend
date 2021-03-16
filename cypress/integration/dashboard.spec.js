/// <reference types="cypress" />

import * as helper from '../support/index';

context('Dashboard Page', () => {
  before(() => {
    cy.visit('/login');
    cy.get('[data-cy=login-email]').clear().type('mrin@email.com');
    cy.get('[data-cy=login-password]').clear().type('password');
    cy.get('[data-cy=login-submit]').click();
  });
  describe('Basic Layout Section', () => {
    it('checks that header exists', () => {
      cy.getDataTag('dashboard-header').exists();
    });
    it('checks that Next Delivery modal exists', () => {
      cy.getDataTag('delivery-modal-header').exists();
    });
    it('checks that Meal Modal exists', () => {
      cy.getDataTag('meal-modal-header').exists();
    });
    it('checks that frequency modal exists', () => {
      cy.getDataTag('frequency-modal-header').exists();
    });
  });

  describe('Next Delivery Modal tests', () => {
    it('checks that next delivery modal is open on page load', () => {
      cy.getDataTag('next-delivery-expanded').exists();
    });
    it('checks that clicking the header closes the modal', () => {
      cy.getDataTag('delivery-modal-header').click();
      cy.getDataTag('next-delivery-expanded').should('not.exist');
      cy.getDataTag('delivery-modal-header').click();
    });
    helper.checkRecipeBlock();
    it('checks that delivery stepper is visible', () => {
      cy.getDataTag('delivery-stepper').exists();
    });
  });

  describe.only('Meal Plan modal tests', () => {
    it('checks that mealplan modal is not open on page load', () => {
      cy.getDataTag('mealplan-expanded').should('not.exist');
    });
    it('checks that Meal Modal opens on click', () => {
      cy.getDataTag('delivery-modal-header').click();
      cy.getDataTag('meal-modal-header').click();
      cy.getDataTag('mealplan-expanded').exists();
    });
    helper.checkRecipeBlock(true, false);
    it('checks that edit recipes link shows', () => {
      cy.getDataTag('edit-recipes-link').exists();
    });
    it('checks that portion stepper shows', () => {
      cy.getDataTag('portion-stepper').exists();
    });
    it('checks that edit portions link shows', () => {
      cy.getDataTag('edit-portions-link').exists();
      cy.getDataTag('meal-modal-header').click();
    });
  });
});
