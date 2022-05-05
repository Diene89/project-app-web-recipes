import React from 'react';
import PropTypes from 'prop-types';

function RecipeType({ btnName, toFilter, testId }) {
  return (
    <button
      type="button"
      data-testid={ testId }
      value={ btnName }
      onClick={ (e) => toFilter(e.target.value) }
    >
      {btnName}
    </button>
  );
}

RecipeType.propTypes = {
  btnName: PropTypes.string.isRequired,
  toFilter: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default RecipeType;
