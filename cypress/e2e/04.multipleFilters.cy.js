/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import testData from '../mocks/testData';

const ROWS_TOTAL = testData.results.length + 1;
const FILTERED_ROWS = 8;
const DOUBLE_FILTERED_ROWS = 3;
const TRIPLE_FILTERED_ROWS = 2;

describe('4 - Implemente múltiplos filtros numéricos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Adicione dois filtros e verifique se a tabela foi atualizada com as informações filtradas', () => {
    cy.get('table tr').should('have.length', ROWS_TOTAL);

    cy.addFilter('diameter', 'maior que', '9000');
    cy.get('table tr').should('have.length', FILTERED_ROWS);

    cy.addFilter('population', 'menor que', '1000000');
    cy.get('table tr').should('have.length', DOUBLE_FILTERED_ROWS);
  });

  it('Adicione três filtros e verifique se a tabela foi atualizada com as informações filtradas', () => {
    cy.get('table tr').should('have.length', ROWS_TOTAL);

    cy.addFilter('diameter', 'maior que', '9000');
    cy.get('table tr').should('have.length', FILTERED_ROWS);

    cy.addFilter('population', 'menor que', '1000000');
    cy.get('table tr').should('have.length', DOUBLE_FILTERED_ROWS);

    cy.addFilter('rotation_period', 'igual a', '23');
    cy.get('table tr').should('have.length', TRIPLE_FILTERED_ROWS);
  });
});
