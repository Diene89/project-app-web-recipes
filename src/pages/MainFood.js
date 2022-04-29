import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Category from '../components/Category';
import { getFoodCategories, getFoods } from '../services/RecipesAPI';

function MainFood() {
  const [categories, setCategories] = useState([]);
  const { recipes, initialRecipes } = useContext(AppContext);

  const getRecipes = async () => {
    try {
      const data = await getFoods();
      const recipesReceived = await data.meals;
      initialRecipes(recipesReceived);
    } catch (error) {
      initialRecipes(error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getFoodCategories();
      const categoriesReceived = await data.meals;
      setCategories(categoriesReceived);
    } catch (error) {
      setCategories(error);
    }
  };

  useEffect(() => { getRecipes(); getCategories(); }, []);
  const recipesQuantityLimit = 12;
  const categoriesQuantityLimit = 5;
  return (
    <main className="MainFood">
      <Header title="Foods" />
      {categories
        .filter((category, index) => index < categoriesQuantityLimit)
        .map((category, index) => (<Category
          btnName={ category.strCategory }
          key={ index }
        />))}
      {recipes
        .filter((recipe, index) => index < recipesQuantityLimit)
        .map((food, index) => (<RecipeCard
          testIdCard={ `${index}-recipe-card` }
          testIdImg={ `${index}-card-img` }
          testIdName={ `${index}-card-name` }
          nameFood={ food.strMeal }
          imgSrc={ food.strMealThumb }
          key={ index }
        />))}
      <Footer />
    </main>
  );
}

export default MainFood;
