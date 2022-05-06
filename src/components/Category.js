import React from 'react';
import PropTypes from 'prop-types';

function Category({ btnName, btnClick }) {
  return (
    <button
      type="button"
      data-testid={ `${btnName}-category-filter` }
      value={ btnName }
      onClick={ (e) => btnClick(e.target.value) }
      style={ { marginLeft: '10px',
        margin: '6px',
        textAlign: 'center',
        borderRadius: '10px',
        border: 'none' } }
    >
      {btnName}
    </button>

  );
}

Category.propTypes = {
  btnName: PropTypes.string.isRequired,
  btnClick: PropTypes.func.isRequired,
};

export default Category;
