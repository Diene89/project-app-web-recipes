import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getIngredientsDrinksAPI } from '../services/RecipesAPI';
import IngredientCard from '../components/IngredientCard';
import AppContext from '../context/AppContext';
import './styles/ExploreByIngredient.css';

function DrinksIngredients(props) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const ingredientsLimit = 12;
  const { history } = props;

  const { searchRecipesBy, setIngredientRecipe } = useContext(AppContext);

  const handleClick = (ingredient) => {
    searchRecipesBy('Ingredient', ingredient, true);
    setIngredientRecipe(true);
    history.push('/drinks');
  };

  useEffect(() => {
    const getIngredients = async () => {
      const results = await getIngredientsDrinksAPI();
      setIngredientsList(results.drinks);
    };
    getIngredients();
  }, []);

  return (
    <main className="ExploreByIngredient">
      <Header title="Explore Ingredients" showSearchIcon={ false } />
      <section className="ingredients">
        {ingredientsList && ingredientsList
          .filter((recipe, index) => index < ingredientsLimit)
          .map((ingredient, index) => (
            <button
              type="button"
              key={ index }
              onClick={ () => handleClick(ingredient.strIngredient1) }
            >
              <IngredientCard
                testIdCard={ `${index}-ingredient-card` }
                testIdImg={ `${index}-card-img` }
                testIdName={ `${index}-card-name` }
                nameIngredient={ ingredient.strIngredient1 }
                imgSrc={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                key={ index }
              />
            </button>
          ))}

      </section>
      <Footer />
    </main>
  );
}

DrinksIngredients.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default DrinksIngredients;
