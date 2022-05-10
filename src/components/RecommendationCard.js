import React from 'react';
import PropTypes from 'prop-types';
import './style/RecommendationCard.css';
import { Link } from 'react-router-dom';

function RecommendationCard({ img, name, category, id, linkToDetails }) {
  return (
    <div data-testid={ `${id}-recomendation-card` } className="RecommendationCard">
      <img src={ img } alt={ name } />
      <Link to={ linkToDetails }>
        <h3>{category}</h3>
        <h2 data-testid={ `${id}-recomendation-title` }>{name}</h2>
      </Link>
    </div>
  );
}

RecommendationCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  linkToDetails: PropTypes.string.isRequired,
};

export default RecommendationCard;
