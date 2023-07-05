import React, { useContext, useCallback, useReducer, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filters: { filterByName }, setFilterByName,
    addNumericFilter, removeNumericFilter, columnOpt } = useContext(Context);

  const handleChange = useCallback(({ target: { value } }) => {
    setFilterByName(value);
  }, [setFilterByName]);

  const [numFilters, setNumericFilter] = useReducer((state, newState) => ({
    ...state, ...newState,
  }), {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const addNumFilterContext = useCallback(() => {
    addNumericFilter(numFilters);
  }, [addNumericFilter, numFilters]);

  const handleChangeNumFilter = useCallback(({ target: { name, value } }) => {
    setNumericFilter({ [name]: value });
  }, []);

  const removeAll = useCallback(() => removeNumericFilter('All'), [removeNumericFilter]);

  useEffect(() => {
    setNumericFilter({ column: columnOpt[0] });
  }, [columnOpt]);

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
          value={ numFilters.column }
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
          value={ numFilters.comparison }
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
          value={ numFilters.value }
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
      </div>
    </div>
  );
}

export default Filters;
