import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { getDrinkCategories, getDrinks,
  getDrinksByCategory } from '../services/RecipesAPI';

function Drinks() {
  const [categories, setCategories] = useState([]);
  const [categoryFiltered, setCategoryFiltered] = useState('');
  const { recipes, initialRecipes, toggleFilter,
    isFiltered, ingredientRecipe, setIngredientRecipe } = useContext(AppContext);

  // const getRecipes = async () => {
  //   try {
  //     const data = await getDrinks();
  //     const recipesReceived = await data.drinks;
  //     initialRecipes(recipesReceived);
  //   } catch (error) {
  //     initialRecipes(error);
  //   }
  // };

  const getRecipes = async () => {
    if (ingredientRecipe === true) {
      setIngredientRecipe(false);
    } else {
      try {
        const data = await getDrinks();
        const recipesReceived = await data.drinks;
        initialRecipes(recipesReceived);
      } catch (error) {
        initialRecipes(error);
      }
    }
  };

  const getCategories = async () => {
    try {
      const data = await getDrinkCategories();
      const categoriesReceived = await data.drinks;
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
        const data = await getDrinksByCategory(category);
        const recipesReceived = await data.drinks;
        initialRecipes(recipesReceived);
        setCategoryFiltered(category);
      } catch (error) {
        initialRecipes(error);
      }
    } else {
      toggleFilter();
      try {
        const data = await getDrinksByCategory(category);
        const recipesReceived = await data.drinks;
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
    <main className="Drink">
      <Header title="Drinks" pageOfDrinks />
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
      {recipes
        .filter((recipe, index) => index < recipesQuantityLimit)
        .map((drink, index) => (<RecipeCard
          testIdCard={ `${index}-recipe-card` }
          testIdImg={ `${index}-card-img` }
          testIdName={ `${index}-card-name` }
          nameFood={ drink.strDrink }
          imgSrc={ drink.strDrinkThumb }
          key={ index }
          detailPage={ `/drinks/${drink.idDrink}` }
        />))}
      <Footer />
    </main>
  );
}

export default Drinks;
