import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style/RecipeDetails.css';
import RecipeHeader from './RecipeHeader';
import {
  getInProgressRecipe,
  isDoneRecipe,
  removeDoneRecipe,
  saveDoneRecipe,
  saveInProgressRecipe,
} from '../helpers/localStorage';
import './style/RecipeInProgress.css';

function RecipeInProgress({ recipe, history }) {
  const isDrinkRecipe = recipe.strDrink !== undefined;
  const recipeID = isDrinkRecipe ? recipe.idDrink : recipe.idMeal;
  const [recipeIngredients, setRecipeIngredients] = useState(
    getInProgressRecipe(recipeID, isDrinkRecipe) || [],
  );
  const [ingredientNameAndMeasure, setIngredientNameAndMeasure] = useState([]);

  useEffect(() => {
    let id = 1;
    const newIngredientNameAndMeasure = [];
    while (recipe[`strIngredient${id}`]) {
      const ingredient = recipe[`strIngredient${id}`];
      const measure = recipe[`strMeasure${id}`];
      newIngredientNameAndMeasure.push(
        `${ingredient}${measure && ` - ${measure}`}`,
      );
      id += 1;
    }
    setIngredientNameAndMeasure(newIngredientNameAndMeasure);
  }, [recipe]);

  function redirectToDoneRecipes() {
    if (!isDoneRecipe(recipeID, isDrinkRecipe)) saveDoneRecipe(recipe);
    history.push('/done-recipes');
  }

  function handleCheckbox({ target: { value, checked } }) {
    let newRecipeIngredients;
    if (checked) {
      newRecipeIngredients = recipeIngredients.concat(Number(value));
    } else {
      newRecipeIngredients = recipeIngredients.filter((id) => id !== Number(value));
      if (recipeIngredients.length === ingredientNameAndMeasure.length) {
        removeDoneRecipe(recipeID);
      }
    }
    setRecipeIngredients(newRecipeIngredients);
    saveInProgressRecipe(recipeID, isDrinkRecipe, newRecipeIngredients);
  }

  function renderIngredientNameAndMeasureWithCheckbox() {
    return (
      <div className="RecipeIngredients">
        <h2>Ingredients</h2>
        <ul>
          {
            ingredientNameAndMeasure.map((value, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  className="ingredient-checkbox"
                  id={ `${index}-ingredient-checkbox` }
                  value={ index }
                  checked={ recipeIngredients.includes(index) }
                  onChange={ handleCheckbox }
                />
                <label
                  htmlFor={ `${index}-ingredient-checkbox` }
                >
                  {value}
                </label>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  return (
    <div className="RecipeInProgress">
      <RecipeHeader recipe={ recipe } />

      {renderIngredientNameAndMeasureWithCheckbox()}

      <div className="instructions">
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>

      <button
        type="button"
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ redirectToDoneRecipes }
        disabled={ ingredientNameAndMeasure.length !== recipeIngredients.length }
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
