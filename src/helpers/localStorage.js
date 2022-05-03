function getDoneRecipe(recipeID, drinkRecipe) {
  let recipes = localStorage.getItem('doneRecipes');
  recipes = recipes ? JSON.parse(recipes) : [];
  return recipes.find(({ id, type }) => {
    if (id !== recipeID) return false;
    if (drinkRecipe && type !== 'drink') return false;
    if (!drinkRecipe && type !== 'meal') return false;
    return true;
  });
}

export default getDoneRecipe;
