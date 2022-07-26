import React from 'react';
import PropTypes from 'prop-types';
import './style/IngredientCard.css';

function RecipeCard({ nameIngredient, imgSrc, testIdCard,
  testIdImg, testIdName }) {
  return (
    <div data-testid={ testIdCard } className="IngredientCard">
      <img src={ imgSrc } alt={ nameIngredient } data-testid={ testIdImg } />
      <span data-testid={ testIdName }>{nameIngredient}</span>
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
