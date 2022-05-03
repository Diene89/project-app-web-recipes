function getDoneRecipe(recipeID, isDrinkRecipe) {
  let recipes = localStorage.getItem('doneRecipes');
  recipes = recipes ? JSON.parse(recipes) : [];
  return recipes.find(({ id, type }) => {
    if (id !== recipeID) return false;
    if (isDrinkRecipe && type !== 'drink') return false;
    if (!isDrinkRecipe && type !== 'meal') return false;
    return true;
  });
}

function getInProgressRecipe(recipeID, isDrinkRecipe) {
  let inProgressRecipes = localStorage.getItem('inProgressRecipes');
  inProgressRecipes = inProgressRecipes
    ? JSON.parse(inProgressRecipes)
    : { cocktails: {}, meals: {} };
  inProgressRecipes = isDrinkRecipe
    ? inProgressRecipes.cocktails
    : inProgressRecipes.meals;
  return inProgressRecipes[recipeID];
}

export { getDoneRecipe, getInProgressRecipe };
