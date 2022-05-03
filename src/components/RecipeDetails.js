import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinks, getFoods } from '../services/RecipesAPI';
import RecommendationCardCarousel from './RecommendationCardCarousel';
import './style/RecipeDetails.css';
import getDoneRecipe from '../helpers/localStorage';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';

function RecipeDetails({ recipe }) {
  const [recommendation, setRecommendation] = useState([]);
  const isDrinkRecipe = recipe.strDrink !== undefined;

  useEffect(() => {
    const getRecommendation = async () => {
      const recommendationReceived = isDrinkRecipe
        ? (await getFoods()).meals
        : (await getDrinks()).drinks;
      setRecommendation(recommendationReceived);
    };
    getRecommendation();
  }, [isDrinkRecipe]);

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

  const strRecipeThumb = isDrinkRecipe ? recipe.strDrinkThumb : recipe.strMealThumb;
  const strRecipe = isDrinkRecipe ? recipe.strDrink : recipe.strMeal;
  const category = isDrinkRecipe ? recipe.strAlcoholic : recipe.strCategory;
  const recipeID = isDrinkRecipe ? recipe.idDrink : recipe.idMeal;
  const doneRecipe = getDoneRecipe(recipeID, isDrinkRecipe);

  return (
    <main className="RecipeDetails">
      <RecipeHeader
        recipeThumb={ strRecipeThumb }
        recipeName={ strRecipe }
        recipeCategory={ category }
      />

      <RecipeIngredients recipe={ recipe } />

      <h2>Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      {renderVideo()}

      {recommendation.length && (
        <RecommendationCardCarousel
          recommendation={ recommendation }
          DrinkRecommendation={ !isDrinkRecipe }
          maxRecommendedCards={ 6 }
        />
      )}

      {doneRecipe === undefined && (
        <button
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      )}
    </main>
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
