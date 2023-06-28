/// <reference types="cypress" />

import mockFetch from "../mocks/fetch";
import { COLUMN_FILTER } from "../utils/dataTestIds";

const FILTERED_ROWS_COUNT_POPULATION = 8;
const FILTERED_ROWS_COUNT_DIAMETER = 4;
const FILTERED_ROWS_COUNT_ORBITAL_PERIOD = 8;
const FILTERED_ROWS_COUNT_ROTATION_PERIOD = 3;
const FILTERED_ROWS_COUNT_SURFACE_WATER = 3;

describe("6 - Não utilize filtros repetidos", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch").callsFake(mockFetch);
      },
    });
  });

  it("Filtre por população e o remove das opções", () => {
    const allColumnsOptions = [
      "population",
      "orbital_period",
      "diameter",
      "rotation_period",
      "surface_water",
    ];

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length);

        allColumnsOptions.forEach((option) => {
          expect(options).to.contain(option);
        });
      });

    cy.addFilter("population", "maior que", "8000");

    cy.get("table tr").should("have.length", FILTERED_ROWS_COUNT_POPULATION);

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length - 1);

        expect(options).to.not.contain("population");
      });
  });

  it("Filtre por diâmetro e o remove das opções", () => {
    const allColumnsOptions = [
      "population",
      "orbital_period",
      "diameter",
      "rotation_period",
      "surface_water",
    ];

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length);

        allColumnsOptions.forEach((option) => {
          expect(options).to.contain(option);
        });
      });

    cy.addFilter("diameter", "maior que", "12240");

    cy.get("table tr").should("have.length", FILTERED_ROWS_COUNT_DIAMETER);

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length - 1);

        expect(options).to.not.contain("diameter");
      });
  });
  it("Filtre por período de rotação e o remove das opções", () => {
    const allColumnsOptions = [
      "population",
      "orbital_period",
      "diameter",
      "rotation_period",
      "surface_water",
    ];

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length);

        allColumnsOptions.forEach((option) => {
          expect(options).to.contain(option);
        });
      });

    cy.addFilter("rotation_period", "maior que", "25");

    cy.get("table tr").should(
      "have.length",
      FILTERED_ROWS_COUNT_ROTATION_PERIOD
    );

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length - 1);

        expect(options).to.not.contain("rotation_period");
      });
  });
  it("Filtre por período de órbita e o remove das opções", () => {
    const allColumnsOptions = [
      "population",
      "orbital_period",
      "diameter",
      "rotation_period",
      "surface_water",
    ];

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length);

        allColumnsOptions.forEach((option) => {
          expect(options).to.contain(option);
        });
      });

    cy.addFilter("orbital_period", "maior que", "350");

    cy.get("table tr").should(
      "have.length",
      FILTERED_ROWS_COUNT_ORBITAL_PERIOD
    );

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length - 1);

        expect(options).to.not.contain("orbital_period");
      });
  });
  it("Filtre por superfície aquática e o remove das opções", () => {
    const allColumnsOptions = [
      "population",
      "orbital_period",
      "diameter",
      "rotation_period",
      "surface_water",
    ];

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length);

        allColumnsOptions.forEach((option) => {
          expect(options).to.contain(option);
        });
      });

    cy.addFilter("surface_water", "maior que", "99");

    cy.get("table tr").should("have.length", FILTERED_ROWS_COUNT_SURFACE_WATER);

    cy.getByTestId(COLUMN_FILTER)
      .find("option")
      .should((options) => {
        expect(options).to.have.length(allColumnsOptions.length - 1);

        expect(options).to.not.contain("surface_water");
      });
  });
});
