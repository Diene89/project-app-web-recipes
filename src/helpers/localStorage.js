function isTheSameRecipe(recipe, id, isDrinkRecipe) {
  if (recipe.id !== id) return false;
  if (isDrinkRecipe && recipe.type !== 'drink') return false;
  if (!isDrinkRecipe && recipe.type !== 'food') return false;
  return true;
}

function getInProgressRecipes() {
  let inProgressRecipes = localStorage.getItem('inProgressRecipes');
  inProgressRecipes = inProgressRecipes
    ? JSON.parse(inProgressRecipes)
    : { cocktails: {}, meals: {} };
  return inProgressRecipes;
}

function getInProgressRecipe(recipeID, isDrinkRecipe) {
  const inProgressRecipes = getInProgressRecipes();
  const recipeType = isDrinkRecipe ? 'cocktails' : 'meals';
  return inProgressRecipes[recipeType][recipeID];
}

function saveInProgressRecipe(recipeID, isDrinkRecipe, recipeIngredients) {
  const inProgressRecipes = getInProgressRecipes();
  const recipeType = isDrinkRecipe ? 'cocktails' : 'meals';
  if (recipeIngredients.length) {
    inProgressRecipes[recipeType][recipeID] = recipeIngredients;
  } else {
    delete inProgressRecipes[recipeType][recipeID];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

function getFavoriteRecipes() {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  return favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
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

function getDoneRecipes() {
  const recipes = localStorage.getItem('doneRecipes');
  return recipes ? JSON.parse(recipes) : [];
}

function getDoneRecipe(recipeID, isDrinkRecipe) {
  const recipes = getDoneRecipes();
  return recipes.find((recipe) => isTheSameRecipe(recipe, recipeID, isDrinkRecipe));
}

function isDoneRecipe(recipeID, isDrinkRecipe) {
  return getDoneRecipes()
    .some((recipe) => isTheSameRecipe(recipe, recipeID, isDrinkRecipe));
}

function saveDoneRecipe(recipe) {
  const isDrinkRecipe = recipe.strDrink !== undefined;
  const id = isDrinkRecipe ? recipe.idDrink : recipe.idMeal;
  const type = isDrinkRecipe ? 'drink' : 'food';
  const nationality = recipe.strArea ? recipe.strArea : '';
  const category = recipe.strCategory ? recipe.strCategory : '';
  const alcoholicOrNot = recipe.strAlcoholic ? recipe.strAlcoholic : '';
  const name = isDrinkRecipe ? recipe.strDrink : recipe.strMeal;
  const image = isDrinkRecipe ? recipe.strDrinkThumb : recipe.strMealThumb;
  const doneDate = new Date().toLocaleDateString();
  const tags = recipe.strTags;

  const doneRecipes = getDoneRecipes();
  doneRecipes.push({
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags: tags ? tags.split(',') : [],
  });

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
}

function removeDoneRecipe(recipeID) {
  const doneRecipes = getDoneRecipes().filter(({ id }) => id !== recipeID);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
}

export {
  getDoneRecipe,
  getInProgressRecipe,
  saveInProgressRecipe,
  getFavoriteRecipes,
  isFavoriteRecipe,
  saveRecipeAsFavorite,
  removeRecipeFromFavorites,
  saveDoneRecipe,
  isDoneRecipe,
  removeDoneRecipe,
};
