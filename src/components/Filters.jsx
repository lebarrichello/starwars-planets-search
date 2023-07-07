import React, { useContext, useCallback, useEffect, useState } from 'react';
import Context from '../context/Context';
import './teste.css';

function Filters() {
  const { filters: { filterByName, numFilters = [] }, setFilterByName,
    addNumericFilter, columnOpt, sortPlanets, removeNumericFilter } = useContext(Context);

  const handleChange = useCallback(({ target: { value } }) => {
    setFilterByName(value);
  }, [setFilterByName]);

  const [numFiltersState, setNumFiltersState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const addNumFilterContext = useCallback(() => {
    addNumericFilter(numFiltersState);
  }, [addNumericFilter, numFiltersState]);

  const handleChangeNumFilter = useCallback(({ target: { name, value } }) => {
    setNumFiltersState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  useEffect(() => {
    setNumFiltersState((prevState) => ({ ...prevState, column: columnOpt[0] }));
  }, [columnOpt]);

  const [sortOptions, setSortOptions] = useState({
    column: 'population',
    order: 'ASC',
  });

  const { column, order } = sortOptions;

  const handleChangeASCDESC = useCallback(({ target: { name, value } }) => {
    setSortOptions((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSort = useCallback(() => {
    sortPlanets(sortOptions);
  }, [sortOptions, sortPlanets]);

  const removeAll = useCallback(() => removeNumericFilter('All'), [removeNumericFilter]);

  const handleRemoveFilter = useCallback((filter) => {
    removeNumericFilter(filter);
  }, [removeNumericFilter]);

  return (
    <div className="containerFilters">
      <div className="filterNamecont">
        <input
          type="text"
          label="Filtrar por nome"
          data-testid="name-filter"
          onChange={ handleChange }
          value={ filterByName }
        />
      </div>
      <div className="filterNumcont">
        <select
          label="Coluna"
          data-testid="column-filter"
          name="column"
          onChange={ handleChangeNumFilter }
          value={ numFiltersState.column }
        >
          {columnOpt.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>

        <select
          label="Operador"
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleChangeNumFilter }
          value={ numFiltersState.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ handleChangeNumFilter }
          value={ numFiltersState.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ addNumFilterContext }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAll }
        >
          Remover Filtros
        </button>
        <select
          name="column"
          data-testid="column-sort"
          value={ column }
          onChange={ handleChangeASCDESC }
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>

        <label htmlFor="column-sort-input-asc">
          <input
            type="radio"
            name="order"
            value="ASC"
            data-testid="column-sort-input-asc"
            checked={ order === 'ASC' }
            onChange={ handleChangeASCDESC }
          />
          Ascendente
        </label>
        <label htmlFor="column-sort-input-desc">
          <input
            type="radio"
            name="order"
            value="DESC"
            data-testid="column-sort-input-desc"
            checked={ order === 'DESC' }
            onChange={ handleChangeASCDESC }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Ordenar
        </button>
      </div>
      <div className="cor">
        <span>Filtros pesquisados:</span>
        {numFilters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <span>
              {filter.column}
              {filter.comparison}
              {filter.value}
            </span>
            <button
              onClick={ () => handleRemoveFilter(filter) }
            >
              𝙭

            </button>
          </div>
        ))}

      </div>

    </div>
  );
}
export default Filters;
