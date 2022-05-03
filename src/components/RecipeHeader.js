import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeHeader({ recipeThumb, recipeName, recipeCategory, isFavoriteRecipe }) {
  const [message, SetMessage] = useState('');

  function copyLink() {
    clipboardCopy(global.location.href);
    SetMessage('Link copied!');
    const messageTime = 3000;
    setTimeout(() => { SetMessage(''); }, messageTime);
  }

  return (
    <header>
      <img
        data-testid="recipe-photo"
        src={ recipeThumb }
        alt={ recipeName }
      />
      <div>
        <h1 data-testid="recipe-title">{recipeName}</h1>
        <button type="button" onClick={ () => { copyLink(); } }>
          <img data-testid="share-btn" src={ shareIcon } alt="shareIcon" />
        </button>
        <button type="button">
          <img
            data-testid="favorite-btn"
            src={ isFavoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="whiteHeartIcon"
          />
        </button>
      </div>
      {message && <p>{message}</p>}
      <h3 data-testid="recipe-category">{recipeCategory}</h3>
    </header>
  );
}

RecipeHeader.propTypes = {
  recipeThumb: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
  isFavoriteRecipe: PropTypes.bool.isRequired,
};

export default RecipeHeader;
