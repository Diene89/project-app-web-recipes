import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails({ recipe }) {
  const isDrinkRecipe = recipe && recipe.strDrink !== undefined;

  const getIngredientNameAndMeasure = () => {
    let ingredientMeasureID = 1;
    const IngredientNameAndMeasure = [];
    while (recipe[`strIngredient${ingredientMeasureID}`]) {
      const ingredient = recipe[`strIngredient${ingredientMeasureID}`];
      const measure = recipe[`strMeasure1${ingredientMeasureID}`];
      IngredientNameAndMeasure.push(
        `${ingredient}${measure && ` - ${measure}`}`,
      );
      ingredientMeasureID += 1;
    }
    return IngredientNameAndMeasure;
  };

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

  function renderVideo() {
    const videoID = isDrinkRecipe
      ? ''
      : recipe.strYoutube.replace('https://www.youtube.com/watch?v=', '');

    return isDrinkRecipe
      ? null
      : (
        <>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${videoID}` }
            title="YouTube video player"
            frameBorder="0"
            allow={ `accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture` }
            allowFullScreen
          />
        </>
      );
  }

  function renderRecipe() {
    const strRecipeThumb = isDrinkRecipe ? recipe.strDrinkThumb : recipe.strMealThumb;
    const strRecipe = isDrinkRecipe ? recipe.strDrink : recipe.strMeal;
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ strRecipeThumb }
          alt={ strRecipe }
        />
        <div>
          <h1 data-testid="recipe-title">{strRecipe}</h1>
          <button type="button">
            <img data-testid="share-btn" src={ shareIcon } alt="shareIcon" />
          </button>
          <button type="button">
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="whiteHeartIcon" />
          </button>
        </div>
        <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
        <h2>Ingredients</h2>
        {renderIngredientNameAndMeasure()}
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {renderVideo()}

        <div data-testid="0-recomendation-card">RECEITAS RECOMENDADAS AQUI</div>

        <button type="button" data-testid="start-recipe-btn">
          Start Recipe
        </button>
      </>
    );
  }

  return (
    <main>
      {recipe && renderRecipe()}
    </main>
  );
}

RecipeDetails.defaultProps = {
  recipe: null,
};

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
};

export default RecipeDetails;
