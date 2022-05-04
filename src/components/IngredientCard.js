import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ nameIngredient, imgSrc, testIdCard,
  testIdImg, testIdName }) {
  return (
    <div data-testId={ testIdCard }>
      <img src={ imgSrc } alt={ nameIngredient } data-testId={ testIdImg } />
      <span data-testId={ testIdName }>{nameIngredient}</span>
    </div>
  );
}

RecipeCard.propTypes = {
  nameIngredient: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  testIdCard: PropTypes.string.isRequired,
  testIdImg: PropTypes.string.isRequired,
  testIdName: PropTypes.string.isRequired,
};

export default RecipeCard;
