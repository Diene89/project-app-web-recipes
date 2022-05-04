import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style/RecipeIngredients.css';

function RecipeIngredients({ recipe }) {
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

  return (
    <div className="RecipeIngredients">
      <h2>Ingredients</h2>
      {
        renderIngredientNameAndMeasure()
      }
    </div>
  );
}

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default RecipeIngredients;
