import React from 'react';
import { PropTypes } from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/exploreButtons.css';

function Explore(props) {
  function goToXploreFoods() {
    const { history } = props;
    history.push('/explore/foods');
  }

  function goToXploreDrinks() {
    const { history } = props;
    history.push('/explore/drinks');
  }

  return (
    <main>
      <Header title="Explore" showSearchIcon={ false } />
      <div className="explore-buttons">
        <button
          type="button"
          name="Explore Foods"
          data-testid="explore-foods"
          onClick={ goToXploreFoods }
        >
          Explore Foods
        </button>
        <button
          type="button"
          name="Explore Drinks"
          data-testid="explore-drinks"
          onClick={ goToXploreDrinks }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </main>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Explore;
