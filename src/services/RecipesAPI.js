const FoodsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DrinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FoodsCategoriesAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DrinksCategoriesAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const RandomFoodAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RandomDrinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const IngredientsFoodsAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const IngredientsDrinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const FoodsAreaAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FoodsExploreAllAPI = 'http://localhost:3000/explore/foods/nationalities';

const getFoods = async () => {
  const response = await fetch(FoodsAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getDrinks = async () => {
  const response = await fetch(DrinksAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getFoodCategories = async () => {
  const response = await fetch(FoodsCategoriesAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getDrinkCategories = async () => {
  const response = await fetch(DrinksCategoriesAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getFoodsByCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getDrinksByCategory = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getFoodsByNationality = async (area) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getAllFoodsExplore = async () => {
  const response = await fetch(FoodsExploreAllAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const randomFoods = async () => {
  const response = await fetch(RandomFoodAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const randomDrinks = async () => {
  const response = await fetch(RandomDrinkAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getIngredientsFoodsAPI = async () => {
  const response = await fetch(IngredientsFoodsAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getIngredientsDrinksAPI = async () => {
  const response = await fetch(IngredientsDrinksAPI);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const getNationalitiesAPI = async () => {
  const response = await fetch(FoodsAreaAPI);

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export { getFoods, getDrinks, getFoodCategories,
  getDrinkCategories, getFoodsByCategory, getDrinksByCategory,
  randomFoods, randomDrinks, getIngredientsFoodsAPI, getIngredientsDrinksAPI,
  getNationalitiesAPI, getFoodsByNationality,
  getAllFoodsExplore };
