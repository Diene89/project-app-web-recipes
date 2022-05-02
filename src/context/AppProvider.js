import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import AppContext from './AppContext';
import {
  fetchRecipesByIngredient,
  fetchRecipesByName,
  fetchRecipesByFirstLetter,
} from '../services';

function AppProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  function checkFirstLetter(value) {
    if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return false;
    }
    return true;
  }

  function initialRecipes(value) {
    setRecipes(value);
  }

  function toggleFilter() {
    setIsFiltered(!isFiltered);
  }

  async function searchRecipesBy(type, value, pageOfDrinks) {
    let recipesReceived;
    switch (type) {
    case 'Ingredient':
      recipesReceived = await fetchRecipesByIngredient(value, pageOfDrinks);
      break;
    case 'Name':
      recipesReceived = await fetchRecipesByName(value, pageOfDrinks);
      break;
    case 'First Letter':
      if (checkFirstLetter(value)) {
        recipesReceived = await fetchRecipesByFirstLetter(value, pageOfDrinks);
      }
      break;
    default:
    }
    if (recipesReceived) {
      if (!recipesReceived.meals && !recipesReceived.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        const recipesResults = pageOfDrinks
          ? recipesReceived.drinks : recipesReceived.meals;
        setRecipes(recipesResults);
      }
    }
  }

  const contextValue = { recipes,
    searchRecipesBy,
    initialRecipes,
    isFiltered,
    toggleFilter };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
