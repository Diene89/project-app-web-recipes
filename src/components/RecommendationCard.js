import React from 'react';
import PropTypes from 'prop-types';

function RecommendationCard({ img, name, category, dataTestID }) {
  return (
    <div data-testid={ dataTestID }>
      <img src={ img } alt={ name } />
      <h3>{category}</h3>
      <h2>{name}</h2>
    </div>
  );
}

RecommendationCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  dataTestID: PropTypes.string.isRequired,
};

export default RecommendationCard;
