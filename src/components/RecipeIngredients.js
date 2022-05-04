import React from 'react';
import PropTypes from 'prop-types';

function RecipeIngredients({ recipe }) {
  function getIngredientNameAndMeasure() {
    let id = 1;
    const IngredientNameAndMeasure = [];
    while (recipe[`strIngredient${id}`]) {
      const ingredient = recipe[`strIngredient${id}`];
      const measure = recipe[`strMeasure${id}`];
      IngredientNameAndMeasure.push(
        `${ingredient}${measure && ` - ${measure}`}`,
      );
      id += 1;
    }
    return IngredientNameAndMeasure;
  }

  function renderIngredientNameAndMeasure() {
    return (
      <ul>
        {
          getIngredientNameAndMeasure().map((value, index) => (
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

  return (
    <div>
      <h2>Ingredients</h2>
      {renderIngredientNameAndMeasure()}
    </div>
  );
}

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
};

export default RecipeIngredients;
