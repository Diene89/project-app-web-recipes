import meal from './meal';
import drink from './drink';
import meals from './meals';
import drinks from './drinks';
import mealIngredients from './mealIngredients';
import areas from './areas';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    const { idMeal } = meal.meals[0];
    const { idDrink } = drinks.drinks[0];
    console.log('URL', url);
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/list.php?a=list':
      return Promise.resolve(areas);
    case 'https://www.themealdb.com/api/json/v1/1/random.php':
    case `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`:
      return Promise.resolve(meal);
    case `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${idDrink}`:
      return Promise.resolve(drinks.drinks);
    case `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`:
      return Promise.resolve(drink);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
      return Promise.resolve(meals);
    case 'https://www.themealdb.com/api/json/v1/1/list.php?i=list':
      return Promise.resolve(mealIngredients);
    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
      return Promise.resolve(drinks);
    default:
      return Promise.reject(new Error('Invalid url'));
    }
  },
});

export default fetch;

/* `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` */
