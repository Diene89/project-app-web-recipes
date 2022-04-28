import React from 'react';
import PropTypes from 'prop-types';

function Category({ btnName }) {
  return (
    <button type="button" data-testid={ `${btnName}-category-filter` }>{btnName}</button>
  );
}

Category.propTypes = {
  btnName: PropTypes.string.isRequired,
};

export default Category;
