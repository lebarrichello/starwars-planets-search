// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const {
  COMPARISON_FILTER,
  COLUMN_FILTER,
  VALUE_FILTER,
  BUTTON_FILTER,
} = require('../utils/dataTestIds');

Cypress.Commands.add('getByTestId', (testId, ...params) => cy.get(`[data-testid="${testId}"]`, ...params));

Cypress.Commands.add('addFilter', (column, comparison, value) => {
  cy.getByTestId(COMPARISON_FILTER).select(comparison);
  cy.getByTestId(COLUMN_FILTER).select(column);
  cy.getByTestId(VALUE_FILTER).clear().type(value);
  cy.getByTestId(BUTTON_FILTER).click();
});

Cypress.Commands.add("getCoverage", () => cy.task('getCoverage', window.Cypress.cy.id));
