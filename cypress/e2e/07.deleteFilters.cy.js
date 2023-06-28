/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import testData from '../mocks/testData';
import { BUTTON_REMOVE_FILTERS, FILTER } from '../utils/dataTestIds';

const TOTAL_ROWS_COUNT = testData.results.length + 1;
const FILTERED_ROWS_COUNT = 8;
const DOUBLE_FILTERED = 3;
const TRIPLE_FILTERED = 2;

const DIAMETER_FILTER_INDEX = 0;
const POPULATION_FILTER_INDEX = 1

const removeFilter = (index = 0) => {
  cy.getByTestId(FILTER).eq(index).find('button').click();
};

describe('7 - Apague um filtro de valor numérico ao clicar no ícone de X de um dos filtros e apague todas filtragens numéricas simultaneamente ao clicar em outro botão de Remover todas filtragens', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Adicione um filtro e verifique se a tabela foi atualizada com as informações filtradas, depois remova o filtro e verifique se os valores da tabela voltaram ao original', () => {
    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);

    cy.addFilter('diameter', 'maior que', '8900');

    cy.get('table tr').should('have.length', FILTERED_ROWS_COUNT);

    removeFilter(DIAMETER_FILTER_INDEX);

    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);
  });

  it('Adicione dois filtros e verifique se a tabela foi atualizada com as informações filtradas, depois remova os filtros e verifique se os valores da tabela voltaram ao original', () => {
    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);

    cy.addFilter('diameter', 'maior que', '8900');
    cy.addFilter('population', 'menor que', '1000000');

    cy.get('table tr').should('have.length', DOUBLE_FILTERED);

    removeFilter(POPULATION_FILTER_INDEX);

    cy.get('table tr').should('have.length', FILTERED_ROWS_COUNT);

    removeFilter(DIAMETER_FILTER_INDEX);

    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);
  });

  it('Adicione três filtros e clique no botão Remover Filtragens, todos os filtros deverão ser removidos', () => {
    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);

    cy.addFilter('diameter', 'maior que', '8900');
    cy.addFilter('population', 'menor que', '1000000');
    cy.addFilter('rotation_period', 'igual a', '23');

    cy.get('table tr').should('have.length', TRIPLE_FILTERED);

    cy.getByTestId(BUTTON_REMOVE_FILTERS).click();

    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);
  });
});
