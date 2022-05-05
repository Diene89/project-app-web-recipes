import React from 'react';
import PropTypes from 'prop-types';

function Category({ btnName }) {
  return (
    <button
      style={ { marginLeft: '10px',
        margin: '6px',
        textAlign: 'center',
        borderRadius: '10px',
        border: 'none' } }
      type="button"
      data-testid={ `${btnName}-category-filter` }
    >
      {btnName}

    </button>

  );
}

Category.propTypes = {
  btnName: PropTypes.string.isRequired,
};

export default Category;
