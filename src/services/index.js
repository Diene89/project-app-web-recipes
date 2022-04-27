async function fetchRecipesByIngredient(ingredient, searchForDrink = false) {
  const URL = searchForDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

async function fetchRecipesByName(name, searchForDrink = false) {
  const URL = searchForDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    : `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

async function fetchRecipesByFirstLetter(firstLetter, searchForDrink = false) {
  const URL = searchForDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
    : `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

export { fetchRecipesByIngredient, fetchRecipesByName, fetchRecipesByFirstLetter };
