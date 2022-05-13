import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ nameRecipe, imgSrc, nationality, alcoholicOrNot, type,
  testIdImg, testIdName, detailPage, testIdCategory, testIdFavoriteBtn, toShare,
  categoryName, testIdShare, copied, notFavorite }) {
  return (
    <div className="card-favorite-recipes">
      <Link to={ detailPage }>
        <img
          className="image-card"
          src={ imgSrc }
          alt="foto da receita"
          data-testid={ testIdImg }
        />
      </Link>
      <div className="favorite-recipe-detail">
        <p data-testid={ testIdCategory }>
          {type === 'food'
            ? `${nationality} - ${categoryName}`
            : alcoholicOrNot }
        </p>
        <Link to={ detailPage }>
          <span data-testid={ testIdName }>{nameRecipe}</span>
        </Link>
      </div>

      <div className="img-favorite-icon">
        <button
          type="button"
          data-testid={ testIdShare }
          src={ shareIcon }
          onClick={ toShare }
        >
          <img src={ shareIcon } alt="shareIcon" />
          {copied ? (<span>Link copied!</span>) : ''}
        </button>
        <button
          type="button"
          data-testid={ testIdFavoriteBtn }
          src={ blackHeartIcon }
          onClick={ notFavorite }
        >
          <img src={ blackHeartIcon } alt="shareIcon" />
        </button>
      </div>

    </div>
  );
}

FavoriteCard.propTypes = {
  nameRecipe: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  testIdImg: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  testIdCategory: PropTypes.string.isRequired,
  testIdName: PropTypes.string.isRequired,
  detailPage: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  testIdShare: PropTypes.string.isRequired,
  testIdFavoriteBtn: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  toShare: PropTypes.func.isRequired,
  notFavorite: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  copied: PropTypes.bool.isRequired,
};

export default FavoriteCard;
