import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomFoods } from '../services/RecipesAPI';
import './styles/defaultButtons.css';

function ExploreFoods(props) {
  const { history } = props;

  const getRandomRecipe = async () => {
    const response = await randomFoods();
    const meal = (`/foods/${response.meals[0].idMeal}`);
    history.push(meal);
  };

  return (
    <section>
      <Header title="Explore Foods" showSearchIcon={ false } />

      <section className="section-btn-explore">
        <div className="default-buttons">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => {
              history.push('/explore/foods/ingredients');
            } }
          >
            By Ingredient
          </button>
          <button
            type="button"
            data-testid="explore-by-nationality"
            onClick={ () => {
              history.push('/explore/foods/nationalities');
            } }
          >
            By Nationality
          </button>
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ getRandomRecipe }
          >
            Surprise me!
          </button>
        </div>
      </section>
      <Footer />
    </section>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExploreFoods;
