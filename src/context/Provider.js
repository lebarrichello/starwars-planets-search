import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchPlanetsAPI from '../services/fetchPlanets';
import { filterBy, sortBy } from '../services/helperFunctions';

export const COLUMNSOPT_DEFAULT = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const A_BEFORE_B = -1;
const B_BEFORE_A = 1;

function Provider({ children }) {
  const [fixedData, setFixedData] = useState([]);
  const [data, setData] = useState([]);
  const [tbColumns, setTableColumns] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [numFilters, setNumericFilters] = useState([]);
  const [columnOpt, setColumnOptions] = useState(COLUMNSOPT_DEFAULT);

  useEffect(() => {
    const fetchPlanets = async () => {
      const planetsData = await fetchPlanetsAPI();
      setData(planetsData);
      setFixedData(planetsData);
      setTableColumns(Object.keys(planetsData[0]));
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const filteredData = fixedData
      .filter((planet) => (
        filterBy.name(filterByName, planet)
        && filterBy.numeric(numFilters, planet)));

    setData(filteredData);
  }, [filterByName, fixedData, numFilters]);

  const sortPlanets = useCallback((sortOrder) => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = Number(a[sortOrder.column]);
      if (!aValue) return B_BEFORE_A;

      const bValue = Number(b[sortOrder.column]);
      if (!bValue) return A_BEFORE_B;

      return sortBy[sortOrder.order](aValue, bValue);
    });

    setData(sortedData);
  }, [data]);

  const addNumericFilter = useCallback((filter) => {
    setColumnOptions(
      (prevOptions) => prevOptions.filter((option) => option !== filter.column),
    );
    setNumericFilters((prevState) => [...prevState, filter]);
  }, []);

  const removeNumericFilter = useCallback((filter) => {
    if (filter === 'All') {
      setColumnOptions(COLUMNSOPT_DEFAULT);
      return setNumericFilters([]);
    }

    setColumnOptions((prevOptions) => [...prevOptions, filter.column]);
    setNumericFilters((prevState) => (
      prevState.filter((prevFilter) => prevFilter.column !== filter.column)));
  }, []);

  const planetsContext = {
    data,
    tbColumns,
    columnOpt,
    setFilterByName,
    sortPlanets,
    addNumericFilter,
    removeNumericFilter,
    filters: {
      numFilters,
      filterByName,
    },
  };

  return (
    <Context.Provider value={ planetsContext }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export default Provider;
