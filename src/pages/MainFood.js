import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Category from '../components/Category';
import { getFoodCategories, getFoods, getFoodsByCategory } from '../services/RecipesAPI';

function MainFood() {
  const [categories, setCategories] = useState([]);
  const [categoryFiltered, setCategoryFiltered] = useState('');
  const { recipes, initialRecipes, toggleFilter, isFiltered,
    ingredientRecipe, setIngredientRecipe } = useContext(AppContext);

  const getRecipes = async () => {
    if (ingredientRecipe === true) {
      setIngredientRecipe(false);
    } else {
      try {
        const data = await getFoods();
        const recipesReceived = await data.meals;
        initialRecipes(recipesReceived);
      } catch (error) {
        initialRecipes(error);
      }
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

  const getByCategory = async (category) => {
    if (category === categoryFiltered && isFiltered === true) {
      toggleFilter();
      await getRecipes();
    } else
    if (isFiltered === true) {
      try {
        const data = await getFoodsByCategory(category);
        const recipesReceived = await data.meals;
        initialRecipes(recipesReceived);
        setCategoryFiltered(category);
      } catch (error) {
        initialRecipes(error);
      }
    } else {
      toggleFilter();
      try {
        const data = await getFoodsByCategory(category);
        const recipesReceived = await data.meals;
        initialRecipes(recipesReceived);
        setCategoryFiltered(category);
      } catch (error) {
        initialRecipes(error);
      }
    }
  };

  useEffect(() => { getRecipes(); getCategories(); }, []);
  const recipesQuantityLimit = 12;
  const categoriesQuantityLimit = 5;
  return (
    <main className="">
      <Header title="Foods" />
      <div className="div-recipes">
        {categories
          .filter((category, index) => index < categoriesQuantityLimit)
          .map((category, index) => (<Category
            btnName={ category.strCategory }
            btnClick={ getByCategory }
            key={ index }
          />))}
        <Category
          btnName="All"
          btnClick={ getRecipes }
        />
        <section className="section-recipe-card">
          {recipes
            .filter((recipe, index) => index < recipesQuantityLimit)
            .map((food, index) => (<RecipeCard
              testIdCard={ `${index}-recipe-card` }
              testIdImg={ `${index}-card-img` }
              testIdName={ `${index}-card-name` }
              nameFood={ food.strMeal }
              imgSrc={ food.strMealThumb }
              key={ index }
              detailPage={ `/foods/${food.idMeal}` }
            />))}
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default MainFood;
