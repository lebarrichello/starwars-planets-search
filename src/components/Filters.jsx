import React, { useContext, useCallback } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filters: { filterByName }, setFilterByName } = useContext(Context);

  const handleChange = useCallback(({ target: { value } }) => {
    setFilterByName(value);
  }, [setFilterByName]);

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
    </div>
  );
}

export default Filters;
