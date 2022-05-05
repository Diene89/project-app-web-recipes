import React from 'react';
import PropTypes from 'prop-types';
import useRecipeDetails from '../hooks/useRecipeDetails';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinkRecipeInProgress({ match, history }) {
  const { id } = match.params;
  const recipe = useRecipeDetails(id, true);

  return (
    <main>
      {recipe && <RecipeInProgress recipe={ recipe } history={ history } />}
    </main>
  );
}

DrinkRecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default DrinkRecipeInProgress;
