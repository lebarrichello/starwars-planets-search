/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import { BUTTON_SORT, INPUT_SORT_ASC, INPUT_SORT_DESC, PLANET_NAME, SELECT_COLUMN_SORT } from '../utils/dataTestIds';

const sortByColumn = (column, order) => {
  cy.getByTestId(SELECT_COLUMN_SORT).select(column);

  const allOrders = {
    asc: () => cy.getByTestId(INPUT_SORT_ASC).click(),
    desc: () => cy.getByTestId(INPUT_SORT_DESC).click(),
  };

  allOrders[order]();

  cy.getByTestId(BUTTON_SORT).click();
};

describe('9 - Ordene as colunas de forma ascendente ou descendente', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Ordene os planetas do maior período orbital para o menor período orbital', () => {
    sortByColumn('orbital_period', 'desc');

    const expectedPlanets = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      expect(el).to.contain(expectedPlanets[index]);
    });
  });

  it('Ordene os planetas do menor diâmetro para o maior diâmetro', () => {
    sortByColumn('diameter', 'asc');

    const expectedPlanets = ['Endor', 'Hoth', 'Dagobah', 'Yavin IV', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino', 'Bespin'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      expect(el).to.contain(expectedPlanets[index]);
    });
  });

  it('Ordene os planetas do mais populoso para o menos populoso', () => {
    sortByColumn('population', 'desc');

    const expectedPlanets = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV'];
    const expectedPlanetsWithUnknownValues = ['Dagobah', 'Hoth'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      if (expectedPlanets[index]) {
        expect(el).to.contain(expectedPlanets[index]);
      } else {
        expect(el.text()).to.be.oneOf(expectedPlanetsWithUnknownValues);
      }
    });
  });

  it('Ordene os planetas do menos populoso para o mais populoso', () => {
    sortByColumn('population', 'asc');

    const expectedPlanets = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant'];
    const expectedPlanetsWithUnknownValues = ['Dagobah', 'Hoth'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      if (expectedPlanets[index]) {
        expect(el).to.contain(expectedPlanets[index]);
      } else {
        expect(el.text()).to.be.oneOf(expectedPlanetsWithUnknownValues);
      }
    });
  });
});
