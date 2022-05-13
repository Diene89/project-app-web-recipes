import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinks, getFoods } from '../services/RecipesAPI';
import RecommendationCardCarousel from './RecommendationCardCarousel';
import './style/RecipeDetails.css';
import { getDoneRecipe, getInProgressRecipe } from '../helpers/localStorage';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';

function RecipeDetails({ recipe, history }) {
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
        <div className="video">
          <h2>Video</h2>
          <iframe
            data-testid="video"
            src={ `https://www.youtube.com/embed/${videoID}` }
            title="YouTube video player"
            frameBorder="0"
            allow={ `accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture` }
            allowFullScreen
          />
        </div>
      );
  }

  function redirectToRecipeInProgress(recipeID) {
    history.push(isDrinkRecipe
      ? `/drinks/${recipeID}/in-progress`
      : `/foods/${recipeID}/in-progress`);
  }

  const recipeID = isDrinkRecipe ? recipe.idDrink : recipe.idMeal;
  const doneRecipe = getDoneRecipe(recipeID, isDrinkRecipe);
  const inProgressRecipe = getInProgressRecipe(recipeID, isDrinkRecipe);

  return (
    <div className="RecipeDetails">
      <RecipeHeader recipe={ recipe } />

      <RecipeIngredients recipe={ recipe } />

      <div className="instructions">
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>

      {renderVideo()}

      {recommendation.length && (
        <RecommendationCardCarousel
          recommendation={ recommendation }
          isDrinkRecommendation={ !isDrinkRecipe }
          maxRecommendedCards={ 6 }
        />
      )}

      {(inProgressRecipe || !doneRecipe) && (
        <button
          type="button"
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ () => { redirectToRecipeInProgress(recipeID); } }
        >
          {inProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
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

export default RecipeDetails;
