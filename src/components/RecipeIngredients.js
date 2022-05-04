import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style/RecipeIngredients.css';
import { getInProgressRecipe, saveInProgressRecipe } from '../helpers/localStorage';

function RecipeIngredients({ recipe, showCheckbox }) {
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

  function handleCheckbox({ target: { value, checked } }) {
    const newRecipeIngredients = checked
      ? recipeIngredients.concat(Number(value))
      : recipeIngredients.filter((id) => id !== Number(value));
    setRecipeIngredients(newRecipeIngredients);
    saveInProgressRecipe(recipeID, isDrinkRecipe, newRecipeIngredients);
  }

  function renderIngredientNameAndMeasure() {
    return (
      <ul>
        {
          ingredientNameAndMeasure.map((value, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {value}
            </li>
          ))
        }
      </ul>
    );
  }

  function renderIngredientNameAndMeasureWithCheckbox() {
    return (
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
    );
  }

  return (
    <div className="RecipeIngredients">
      <h2>Ingredients</h2>
      {
        showCheckbox
          ? renderIngredientNameAndMeasureWithCheckbox()
          : renderIngredientNameAndMeasure()
      }
    </div>
  );
}

RecipeIngredients.defaultProps = {
  showCheckbox: false,
};

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  showCheckbox: PropTypes.bool,
};

export default RecipeIngredients;
