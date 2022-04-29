import React from 'react';
import PropTypes from 'prop-types';
import useRecipeDetails from '../hooks/useRecipeDetails';
import RecipeDetails from '../components/RecipeDetails';

function FoodRecipe({ match }) {
  const { id } = match.params;
  const recipe = useRecipeDetails(id, false);

  return (
    <main>
      <RecipeDetails recipe={ recipe } />
    </main>
  );
}

FoodRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodRecipe;
