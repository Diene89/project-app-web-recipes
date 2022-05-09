import meal from './meal';
import meals from './meals';
import drinks from './drinks';
import mealIngredients from './mealIngredients';
import areas from './areas';
import drinkIngredients from './drinkIngredients';
import drink from './drink';
import mealCategories from './mealCategories';
import chickenMeals from './chickenMeals';
import lightRumDrinks from './lightRumDrinks';
import drinksCategories from './drinksCategories';
import americanMeals from './americanMeals';
import turkishMeals from './turkishMeals';

const invalidURL = 'Invalid url';

const theMealDb = (url) => {
  const { idMeal } = meal.meals[0];
  switch (url) {
  case 'https://www.themealdb.com/api/json/v1/1/list.php?a=list':
    return Promise.resolve(areas);
  case 'https://www.themealdb.com/api/json/v1/1/random.php':
  case `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`:
    return Promise.resolve(meal);
  case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
    return Promise.resolve(meals);
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken':
    return Promise.resolve(chickenMeals);
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American':
    return Promise.resolve(americanMeals);
  case 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Turkish':
    return Promise.resolve(turkishMeals);
  case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
    return Promise.resolve(mealCategories);
  case 'https://www.themealdb.com/api/json/v1/1/list.php?i=list':
    return Promise.resolve(mealIngredients);
  default:
    return Promise.reject(new Error(invalidURL));
  }
};

const theCocktailDb = (url) => {
  const { idDrink } = drink.drinks[0];
  switch (url) {
  case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
    return Promise.resolve(drinks);
  case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum':
    return Promise.resolve(lightRumDrinks);
  case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
    return Promise.resolve(drinksCategories);
  case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list':
    return Promise.resolve(drinkIngredients);
  case 'https://www.thecocktaildb.com/api/json/v1/1/random.php':
  case `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`:
    return Promise.resolve(drink);
  default:
    return Promise.reject(new Error(invalidURL));
  }
};

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    console.log('URL', url);
    if (url.includes('themealdb')) return theMealDb(url);
    if (url.includes('thecocktaildb')) return theCocktailDb(url);
    return Promise.reject(new Error(invalidURL));
  },
});

export default fetch;
