import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomDrinks } from '../services/RecipesAPI';
import './styles/ExploreDrinks.css';
import './styles/exploreButtons.css';

function ExploreDrinks(props) {
  const { history } = props;

  const getRandomRecipe = async () => {
    const response = await randomDrinks();
    const drink = (`/drinks/${response.drinks[0].idDrink}`);
    history.push(drink);
  };

  return (
    <section className="section-explore-drink">
      <Header title="Explore Drinks" showSearchIcon={ false } />

      <section className="section-btn-explore">
        <div className="explore-buttons">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => {
              history.push('/explore/drinks/ingredients');
            } }
          >
            By Ingredient
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

ExploreDrinks.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ExploreDrinks;
