import React from 'react';
import PropTypes from 'prop-types';
import './style/RecipeDetails.css';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';

function RecipeInProgress({ recipe }) {
  return (
    <div className="RecipeDetails">
      <RecipeHeader recipe={ recipe } />

      <RecipeIngredients recipe={ recipe } showCheckbox />

      <h2>Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button
        type="button"
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default RecipeInProgress;
