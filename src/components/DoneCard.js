import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './style/DoneCard.css';

function DoneCard({ nameRecipe, imgSrc, nationality, alcoholicOrNot, type,
  testIdImg, testIdName, detailPage, testIdCategory, toShare,
  categoryName, testIdShare, copied, tags, index, done }) {
  return (
    <div className="DoneCard">
      <Link to={ detailPage }>
        <img
          className="card-image"
          src={ imgSrc }
          alt="foto da receita"
          data-testid={ testIdImg }
        />
      </Link>
      <div className="done-recipe-detail">
        <p data-testid={ testIdCategory }>
          {type === 'food'
            ? `${nationality} - ${categoryName}`
            : alcoholicOrNot }
        </p>
        <Link to={ detailPage }>
          <span data-testid={ testIdName }>{nameRecipe}</span>
        </Link>
      </div>

      <div className="img-done-icon">
        <button
          type="button"
          data-testid={ testIdShare }
          src={ shareIcon }
          onClick={ toShare }
        >
          <img src={ shareIcon } alt="shareIcon" />
          {copied ? (<span>Link copied!</span>) : ''}
        </button>
        <span data-testid={ `${index}-horizontal-done-date` }>{`Done in: ${done}`}</span>
        {tags.map((tag) => (
          <span
            key={ `${tag}-${index}` }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </span>))}
      </div>

    </div>
  );
}

DoneCard.propTypes = {
  nameRecipe: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  testIdImg: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  testIdCategory: PropTypes.string.isRequired,
  testIdName: PropTypes.string.isRequired,
  detailPage: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  testIdShare: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  toShare: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  copied: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  done: PropTypes.string.isRequired,
};

export default DoneCard;
