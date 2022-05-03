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

function getFavoriteRecipes() {
  let favoriteRecipes = localStorage.getItem('favoriteRecipes');
  favoriteRecipes = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
  return favoriteRecipes;
}

function isFavoriteRecipe(recipeID, isDrinkRecipe) {
  return getFavoriteRecipes()
    .some((recipe) => isTheSameRecipe(recipe, recipeID, isDrinkRecipe));
}

function saveRecipeAsFavorite(recipe) {
  const isDrinkRecipe = recipe.strDrink !== undefined;
  const id = isDrinkRecipe ? recipe.idDrink : recipe.idMeal;
  const type = isDrinkRecipe ? 'drink' : 'food';
  const nationality = recipe.strArea ? recipe.strArea : '';
  const category = recipe.strCategory ? recipe.strCategory : '';
  const alcoholicOrNot = recipe.strAlcoholic ? recipe.strAlcoholic : '';
  const name = isDrinkRecipe ? recipe.strDrink : recipe.strMeal;
  const image = isDrinkRecipe ? recipe.strDrinkThumb : recipe.strMealThumb;

  const favoriteRecipes = getFavoriteRecipes();
  favoriteRecipes.push({
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
  });

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

function removeRecipeFromFavorites(recipeID) {
  const favoriteRecipes = getFavoriteRecipes().filter(({ id }) => id !== recipeID);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

export {
  getDoneRecipe,
  getInProgressRecipe,
  getFavoriteRecipes,
  isFavoriteRecipe,
  saveRecipeAsFavorite,
  removeRecipeFromFavorites,
};
