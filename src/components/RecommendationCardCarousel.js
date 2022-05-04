import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import RecommendationCard from './RecommendationCard';
import './style/RecommendationCardCarousel.css';

function RecommendationCardCarousel({
  recommendation,
  DrinkRecommendation,
  maxRecommendedCards,
}) {
  function getPairOfRecommendedCards(start) {
    return (
      <div className="carouselItem">
        {recommendation[start] && (
          <RecommendationCard
            img={ DrinkRecommendation
              ? recommendation[start].strDrinkThumb
              : recommendation[start].strMealThumb }
            name={ DrinkRecommendation
              ? recommendation[start].strDrink
              : recommendation[start].strMeal }
            category={ DrinkRecommendation
              ? recommendation[start].strAlcoholic
              : recommendation[start].strCategory }
            id={ start }
          />
        )}
        {recommendation[start + 1] && (
          <RecommendationCard
            img={ DrinkRecommendation
              ? recommendation[start + 1].strDrinkThumb
              : recommendation[start + 1].strMealThumb }
            name={ DrinkRecommendation
              ? recommendation[start + 1].strDrink
              : recommendation[start + 1].strMeal }
            category={ DrinkRecommendation
              ? recommendation[start + 1].strAlcoholic
              : recommendation[start + 1].strCategory }
            id={ start + 1 }
          />
        )}
      </div>
    );
  }

  function getCarouselItems() {
    const carouselItems = [];
    const maxCards = recommendation.length < maxRecommendedCards
      ? recommendation.length
      : maxRecommendedCards;
    for (let index = 0; index < maxCards; index += 2) {
      carouselItems.push((
        <Carousel.Item key={ index }>
          {getPairOfRecommendedCards(index)}
        </Carousel.Item>
      ));
    }
    return carouselItems;
  }

  return (
    <Carousel interval={ null } className="RecommendationCardCarousel">
      {getCarouselItems()}
    </Carousel>
  );
}

RecommendationCardCarousel.propTypes = {
  recommendation: PropTypes.arrayOf(PropTypes.object).isRequired,
  DrinkRecommendation: PropTypes.bool.isRequired,
  maxRecommendedCards: PropTypes.number.isRequired,
};

export default RecommendationCardCarousel;