import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import RecommendationCard from './RecommendationCard';
import './style/RecommendationCardCarousel.css';

function RecommendationCardCarousel({
  recommendation,
  isDrinkRecommendation,
  maxRecommendedCards,
}) {
  function getPairOfRecommendedCards(start) {
    console.log(recommendation);
    return (
      <div className="carouselItem">
        {recommendation[start] && (
          <RecommendationCard
            img={ isDrinkRecommendation
              ? recommendation[start].strDrinkThumb
              : recommendation[start].strMealThumb }
            name={ isDrinkRecommendation
              ? recommendation[start].strDrink
              : recommendation[start].strMeal }
            category={ isDrinkRecommendation
              ? recommendation[start].strAlcoholic
              : recommendation[start].strCategory }
            id={ start }
            linkToDetails={ isDrinkRecommendation
              ? `/drinks/${recommendation[start].idDrink}`
              : `/foods/${recommendation[start].idMeal}` }
          />
        )}
        {recommendation[start + 1] && (
          <RecommendationCard
            img={ isDrinkRecommendation
              ? recommendation[start + 1].strDrinkThumb
              : recommendation[start + 1].strMealThumb }
            name={ isDrinkRecommendation
              ? recommendation[start + 1].strDrink
              : recommendation[start + 1].strMeal }
            category={ isDrinkRecommendation
              ? recommendation[start + 1].strAlcoholic
              : recommendation[start + 1].strCategory }
            id={ start + 1 }
            linkToDetails={ isDrinkRecommendation
              ? `/drinks/${recommendation[start + 1].idDrink}`
              : `/foods/${recommendation[start + 1].idMeal}` }
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
  isDrinkRecommendation: PropTypes.bool.isRequired,
  maxRecommendedCards: PropTypes.number.isRequired,
};

export default RecommendationCardCarousel;
