import React from 'react';
import PropTypes from 'prop-types';
import useRecipeDetails from '../hooks/useRecipeDetails';
import RecipeDetails from '../components/RecipeDetails';

function DrinksRecipe({ match, history }) {
  const { id } = match.params;
  const recipe = useRecipeDetails(id, true);

  return (
    <main>
      {recipe && <RecipeDetails recipe={ recipe } history={ history } />}
    </main>
  );
}

DrinksRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default DrinksRecipe;
