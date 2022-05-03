import React from 'react';
import PropTypes from 'prop-types';
import useRecipeDetails from '../hooks/useRecipeDetails';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinkRecipeInProgress({ match }) {
  const { id } = match.params;
  const recipe = useRecipeDetails(id, true);

  return (
    <main>
      {recipe && <RecipeInProgress recipe={ recipe } />}
    </main>
  );
}

DrinkRecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkRecipeInProgress;
