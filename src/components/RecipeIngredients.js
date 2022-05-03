import React from 'react';
import PropTypes from 'prop-types';

function RecipeIngredients({ recipe, showCheckbox }) {
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

  function renderIngredientNameAndMeasureWithCheckbox() {
    return (
      <ul>
        {
          getIngredientNameAndMeasure().map((value, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
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
  recipe: PropTypes.shape({}).isRequired,
  showCheckbox: PropTypes.bool,
};

export default RecipeIngredients;
