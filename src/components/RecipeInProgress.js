import React from 'react';
import PropTypes from 'prop-types';
import './style/RecipeDetails.css';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';

function RecipeInProgress({ recipe, history }) {
  function redirectToDoneRecipes() {
    history.push('/done-recipes');
  }

  return (
    <div className="RecipeInProgress">
      <RecipeHeader recipe={ recipe } />

      <RecipeIngredients recipe={ recipe } showCheckbox />

      <h2>Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button
        type="button"
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ redirectToDoneRecipes }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
