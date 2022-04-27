const FoodsAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DrinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

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

export { getFoods, getDrinks };
