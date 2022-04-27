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

  async function checkFirstLetter(value, pageOfDrinks) {
    if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setRecipes(await fetchRecipesByFirstLetter(value, pageOfDrinks));
    }
  }

  async function searchRecipesBy(type, value, pageOfDrinks) {
    switch (type) {
    case 'Ingredient':
      setRecipes(await fetchRecipesByIngredient(value, pageOfDrinks));
      break;
    case 'Name':
      setRecipes(await fetchRecipesByName(value, pageOfDrinks));
      break;
    case 'First Letter':
      checkFirstLetter(value, pageOfDrinks);
      break;
    default:
    }
  }

  const contextValue = { recipes, searchRecipesBy };
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
