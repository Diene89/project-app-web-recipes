import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Category from '../components/Category';
import { getFoodCategories, getFoods } from '../services/RecipesAPI';

function MainFood() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const getRecipes = async () => {
    try {
      const data = await getFoods();
      const recipes = await data.meals;
      const auxFoods = [];
      const doze = 12;
      for (let index = 0; index < doze; index += 1) {
        auxFoods.push(recipes[index]);
      }
      setFoods(auxFoods);
    } catch (error) {
      setFoods(error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getFoodCategories();
      const recipes = await data.meals;
      const auxCategories = [];
      const cinco = 5;
      for (let index = 0; index < cinco; index += 1) {
        auxCategories.push(recipes[index]);
      }
      setCategories(auxCategories);
    } catch (error) {
      setCategories(error);
    }
  };

  useEffect(() => { getRecipes(); getCategories(); }, []);

  return (
    <main className="">
      <Header title="Foods" />
      {categories.map((category, index) => (<Category
        btnName={ category.strCategory }
        key={ index }
      />))}
      {foods.map((food, index) => (<RecipeCard
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
