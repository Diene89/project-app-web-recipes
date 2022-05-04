async function fetchRecipesByIngredient(ingredient, searchForDrink = false) {
  const URL = searchForDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  try {
    return await response.json();
  } catch (e) {
    return searchForDrink ? { drinks: null } : { meals: null };
  }
}

async function fetchRecipesByName(name, searchForDrink = false) {
  const URL = searchForDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    : `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL);
  try {
    return await response.json();
  } catch (e) {
    return searchForDrink ? { drinks: null } : { meals: null };
  }
}

async function fetchRecipesByFirstLetter(firstLetter, searchForDrink = false) {
  const URL = searchForDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
    : `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  try {
    return await response.json();
  } catch (e) {
    return searchForDrink ? { drinks: null } : { meals: null };
  }
}

async function fetchRecipeByID(id, searchForDrink = false) {
  const URL = searchForDrink
    ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  try {
    const data = await response.json();
    if (data.drinks) return data.drinks[0];
    if (data.meals) return data.meals[0];
    return null;
  } catch (e) {
    return null;
  }
}

export {
  fetchRecipesByIngredient,
  fetchRecipesByName,
  fetchRecipesByFirstLetter,
  fetchRecipeByID,
};
