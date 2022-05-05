import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  isFavoriteRecipe,
  removeRecipeFromFavorites,
  saveRecipeAsFavorite,
} from '../helpers/localStorage';

function RecipeHeader({ recipe }) {
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [message, SetMessage] = useState('');
  const isDrinkRecipe = recipe.strDrink !== undefined;
  const recipeID = isDrinkRecipe ? recipe.idDrink : recipe.idMeal;
  let strRecipeThumb;
  let strRecipe;
  let category;
  if (isDrinkRecipe) {
    strRecipeThumb = recipe.strDrinkThumb;
    strRecipe = recipe.strDrink;
    category = recipe.strAlcoholic;
  } else {
    strRecipeThumb = recipe.strMealThumb;
    strRecipe = recipe.strMeal;
    category = recipe.strCategory;
  }

  useEffect(() => {
    setFavoriteRecipe(isFavoriteRecipe(recipeID, isDrinkRecipe));
  }, [recipeID, isDrinkRecipe]);

  function toggleFavoriteRecipe() {
    if (favoriteRecipe) {
      removeRecipeFromFavorites(recipeID);
      setFavoriteRecipe(false);
    } else {
      saveRecipeAsFavorite(recipe);
      setFavoriteRecipe(true);
    }
  }

  function copyLink() {
    clipboardCopy(global.location.href.replace('/in-progress', ''));
    SetMessage('Link copied!');
    const messageTime = 3000;
    setTimeout(() => { SetMessage(''); }, messageTime);
  }

  return (
    <header>
      <img
        data-testid="recipe-photo"
        src={ strRecipeThumb }
        alt={ strRecipe }
      />
      <div>
        <h1 data-testid="recipe-title">{strRecipe}</h1>
        <button type="button" onClick={ copyLink }>
          <img data-testid="share-btn" src={ shareIcon } alt="shareIcon" />
        </button>
        <button type="button" onClick={ toggleFavoriteRecipe }>
          <img
            data-testid="favorite-btn"
            src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="whiteHeartIcon"
          />
        </button>
      </div>
      {message && <p>{message}</p>}
      <h3 data-testid="recipe-category">{category}</h3>
    </header>
  );
}

RecipeHeader.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
};

export default RecipeHeader;
