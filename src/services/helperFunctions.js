export const compareBy = {
  'maior que': (a, b) => a > b,
  'menor que': (a, b) => a < b,
  'igual a': (a, b) => a === b,
};

export const filterBy = {
  numeric: (numericFilters, planet) => (
    numericFilters.every(({ column, comparison, value }) => (
      compareBy[comparison](Number(planet[column]), Number(value))))),
  name: (name, planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
};

const A_BEFORE_B = -1;
const B_BEFORE_A = 1;

export const sortBy = {
  ASC: (a, b) => (a < b ? A_BEFORE_B : B_BEFORE_A),
  DESC: (a, b) => (a > b ? A_BEFORE_B : B_BEFORE_A),
};
