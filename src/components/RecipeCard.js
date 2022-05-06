import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ nameFood, imgSrc, testIdCard, testIdImg, testIdName, detailPage }) {
  return (
    <Link to={ detailPage }>
      <div className="recipe-card" data-testId={ testIdCard }>
        <img
          src={ imgSrc }
          alt="foto da receita"
          data-testId={ testIdImg }
        />
        <span data-testId={ testIdName }>{nameFood}</span>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  nameFood: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  testIdCard: PropTypes.string.isRequired,
  testIdImg: PropTypes.string.isRequired,
  testIdName: PropTypes.string.isRequired,
  detailPage: PropTypes.string.isRequired,
};

export default RecipeCard;
