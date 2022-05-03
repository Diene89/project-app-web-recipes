const FoodsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DrinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FoodsCategoriesAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DrinksCategoriesAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const RandomFoodAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RandomDrinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

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

export { getFoods, getDrinks, getFoodCategories,
  getDrinkCategories, getFoodsByCategory, getDrinksByCategory,
  randomFoods, randomDrinks };
