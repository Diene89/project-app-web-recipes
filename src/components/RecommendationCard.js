import React from 'react';
import PropTypes from 'prop-types';
import './style/RecommendationCard.css';

function RecommendationCard({ img, name, category, id }) {
  return (
    <div data-testid={ `${id}-recomendation-card` } className="RecommendationCard">
      <img src={ img } alt={ name } />
      <h3>{category}</h3>
      <h2 data-testid={ `${id}-recomendation-title` }>{name}</h2>
    </div>
  );
}

RecommendationCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecommendationCard;
