import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style/RecipeDetails.css';
import RecipeHeader from './RecipeHeader';
import { getInProgressRecipe, saveInProgressRecipe } from '../helpers/localStorage';

function RecipeInProgress({ recipe, history }) {
  const isDrinkRecipe = recipe.strDrink !== undefined;
  const recipeID = isDrinkRecipe ? recipe.idDrink : recipe.idMeal;
  const [recipeIngredients, setRecipeIngredients] = useState(
    getInProgressRecipe(recipeID, isDrinkRecipe),
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
    history.push('/done-recipes');
  }

  function handleCheckbox({ target: { value, checked } }) {
    const newRecipeIngredients = checked
      ? recipeIngredients.concat(Number(value))
      : recipeIngredients.filter((id) => id !== Number(value));
    setRecipeIngredients(newRecipeIngredients);
    saveInProgressRecipe(recipeID, isDrinkRecipe, newRecipeIngredients);
  }

  function renderIngredientNameAndMeasureWithCheckbox() {
    return (
      <>
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
      </>
    );
  }

  return (
    <div className="RecipeInProgress">
      <RecipeHeader recipe={ recipe } />

      {renderIngredientNameAndMeasureWithCheckbox()}

      <h2>Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button
        type="button"
        className="start-recipe-btn"
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
