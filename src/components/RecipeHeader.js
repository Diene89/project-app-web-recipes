import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeHeader({ recipeThumb, recipeName, recipeCategory }) {
  return (
    <header>
      <img
        data-testid="recipe-photo"
        src={ recipeThumb }
        alt={ recipeName }
      />
      <div>
        <h1 data-testid="recipe-title">{recipeName}</h1>
        <button type="button">
          <img data-testid="share-btn" src={ shareIcon } alt="shareIcon" />
        </button>
        <button type="button">
          <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="whiteHeartIcon" />
        </button>
      </div>
      <h3 data-testid="recipe-category">{recipeCategory}</h3>
    </header>
  );
}

RecipeHeader.propTypes = {
  recipeThumb: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
};

export default RecipeHeader;
