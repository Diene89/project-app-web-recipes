function isTheSameRecipe(recipe, id, isDrinkRecipe) {
  if (recipe.id !== id) return false;
  if (isDrinkRecipe && recipe.type !== 'drink') return false;
  if (!isDrinkRecipe && recipe.type !== 'food') return false;
  return true;
}

function getDoneRecipe(recipeID, isDrinkRecipe) {
  let recipes = localStorage.getItem('doneRecipes');
  recipes = recipes ? JSON.parse(recipes) : [];
  return recipes.find((recipe) => isTheSameRecipe(recipe, recipeID, isDrinkRecipe));
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

function isFavoriteRecipe(recipeID, isDrinkRecipe) {
  let favoriteRecipes = localStorage.getItem('favoriteRecipes');
  favoriteRecipes = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
  return favoriteRecipes
    .some((recipe) => isTheSameRecipe(recipe, recipeID, isDrinkRecipe));
}

export { getDoneRecipe, getInProgressRecipe, isFavoriteRecipe };
