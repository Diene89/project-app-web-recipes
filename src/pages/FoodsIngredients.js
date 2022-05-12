import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getIngredientsFoodsAPI } from '../services/RecipesAPI';
import IngredientCard from '../components/IngredientCard';
import AppContext from '../context/AppContext';
import './styles/ExploreByIngredient.css';

function FoodsIngredients(props) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const ingredientsLimit = 12;
  const { history } = props;

  const { searchRecipesBy, setIngredientRecipe } = useContext(AppContext);

  const handleClick = (ingredient) => {
    searchRecipesBy('Ingredient', ingredient, false);
    setIngredientRecipe(true);
    history.push('/foods');
  };

  useEffect(() => {
    const getIngredients = async () => {
      const results = await getIngredientsFoodsAPI();
      setIngredientsList(results.meals);
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
              onClick={ () => handleClick(ingredient.strIngredient) }
            >
              <IngredientCard
                testIdCard={ `${index}-ingredient-card` }
                testIdImg={ `${index}-card-img` }
                testIdName={ `${index}-card-name` }
                nameIngredient={ ingredient.strIngredient }
                imgSrc={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                key={ index }
              />
            </button>
          ))}

      </section>
      <Footer />
    </main>
  );
}

FoodsIngredients.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default FoodsIngredients;
