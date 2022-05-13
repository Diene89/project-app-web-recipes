import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import MainFood from '../pages/MainFood';
import Drinks from '../pages/Drinks';
import FoodRecipe from '../pages/FoodRecipe';
import DrinksRecipe from '../pages/DrinksRecipe';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodsIngredients from '../pages/FoodsIngredients';
import DrinksIngredients from '../pages/DrinksIngredients';
import FoodsNationalities from '../pages/FoodsNationalities';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodRecipeInProgress from '../pages/FoodRecipeInProgress';
import DrinkRecipeInProgress from '../pages/DrinkRecipeInProgress';
import NotFound from './NotFound';
import Async from '../pages/Async';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Async } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/foods" component={ MainFood } />
      <Route exact path="/foods/:id" component={ FoodRecipe } />
      <Route exact path="/foods/:id/in-progress" component={ FoodRecipeInProgress } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ DrinksRecipe } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkRecipeInProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ FoodsNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
