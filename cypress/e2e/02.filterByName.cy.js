/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import testData from '../mocks/testData';

const planets = testData.results;

const ROWS_TOTAL = 11;
const ROWS_WITH_LETTER_O = 8;
const ROWS_WITH_LETTER_OO = 3;

import { INPUT_FILTER_NAME } from '../utils/dataTestIds';

describe('2 - Crie um filtro de texto para a tabela', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Filtre os planetas que possuem a letra "o" no nome', () => {
    cy.getByTestId(INPUT_FILTER_NAME).type('o');

    cy.get('table tr').should('have.length', ROWS_WITH_LETTER_O);

    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    planetNames.forEach((planet) => {
      cy.contains(planet);
    });
  });

  it('Filtre planetas que possuem a letra "oo" no nome', () => {
    cy.getByTestId(INPUT_FILTER_NAME).type('oo');

    cy.get('table tr').should('have.length', ROWS_WITH_LETTER_OO);

    cy.contains('Naboo');
    cy.contains('Tatooine');
  });

  it('Faça vários filtros em sequência', () => {
    cy.getByTestId(INPUT_FILTER_NAME).type('o');
    cy.get('table tr').should('have.length', ROWS_WITH_LETTER_O);

    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    planetNames.forEach((planet) => {
      cy.contains(planet);
    });

    cy.getByTestId(INPUT_FILTER_NAME).type('o');
    cy.get('table tr').should('have.length', ROWS_WITH_LETTER_OO);

    cy.contains('Naboo');
    cy.contains('Tatooine');

    cy.getByTestId(INPUT_FILTER_NAME).clear();
    cy.get('table tr').should('have.length', ROWS_TOTAL);

    planets.forEach(({ name }) => {
      cy.contains(name);
    });
  })
});
