// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const checkRecipeBlock = (showPrice = true, showDelivery = true) => {
  it('checks that mealplan card is showing', () => {
    cy.getDataTag('mealplan-card').exists();
  });
  showDelivery &&
    it('checks that a delievery date is showing', () => {
      cy.getDataTag('mealplan-next-delivery-date').exists();
    });
  showPrice &&
    it('checks that mealplan price is showing', () => {
      cy.getDataTag('mealplan-price').exists();
    });
  it('checks that mealplan portion is showing', () => {
    cy.getDataTag('mealplan-portion').exists();
  });
  it('checks that recipe is showing', () => {
    cy.getDataTag('mealplan-recipe').exists();
  });
  it('checks that plan length is showing', () => {
    cy.getDataTag('mealplan-recipe').exists();
  });
};
