/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import testData from '../mocks/testData';

const MAX_COLUMNS_COUNT = 13;

const planets = testData.results;

describe('1 - Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos da coluna `residents`', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch).as('mockFetch');
      },
    });
  });

  it('Realize uma requisição para a API', () => {
    cy.get('@mockFetch').should('be.called');
  });

  it('Preencha a tabela com os dados retornados', () => {
    planets.forEach((planet) => {
      cy.contains(planet.name);
      cy.contains(planet.rotation_period);
      cy.contains(planet.orbital_period);
      cy.contains(planet.diameter);
      cy.contains(planet.climate);
      cy.contains(planet.gravity);
      cy.contains(planet.terrain);
      cy.contains(planet.surface_water);
      cy.contains(planet.population);
    });
  });

  it('Verifique se a tabela tem 13 colunas', () => {
    // a requisição (mock) retorna 14 chaves em cada planeta, mas a chave `residents` não deve ser exibida totalizando 13 colunas
    cy.get('table tr:first th')
      .should('have.length', MAX_COLUMNS_COUNT);
  });

  it('Verifique se a tabela tem uma linha para cada planeta retornado', () => {
    // a requisição (mock) retorna 10 planetas, somando com mais um linha do header totalizando 11 linhas
    cy.get('table tr').should('have.length', planets.length + 1);
  });
});
