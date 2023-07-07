import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function AppliedFilters({ filter }) {
  console.log(filter);
  const { removeNumericFilter } = useContext(Context);

  const deleteBtn = useCallback(() => removeNumericFilter(filter), [
    filter, removeNumericFilter]);

  return (
    <div
      className="filter-item"
      key={ filter.column }
      data-testid="filter"
    >
      <span>{`${filter.column} ${filter.comparison} ${filter.value}`}</span>
      <button
        type="button"
        onClick={ deleteBtn }
      >
        X
      </button>
    </div>
  );
}

AppliedFilters.propTypes = {
  filter: PropTypes.shape({
    column: PropTypes.string.isRequired,
    comparison: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppliedFilters;
