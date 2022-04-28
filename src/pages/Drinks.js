import React, { useState, useEffect } from 'react';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { getDrinkCategories, getDrinks } from '../services/RecipesAPI';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  const getRecipes = async () => {
    try {
      const data = await getDrinks();
      const recipes = await data.drinks;
      const auxDrinks = [];
      const doze = 12;
      for (let index = 0; index < doze; index += 1) {
        auxDrinks.push(recipes[index]);
      }
      setDrinks(auxDrinks);
    } catch (error) {
      setDrinks(error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getDrinkCategories();
      const recipes = await data.drinks;
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
    <main className="Drink">
      <Header title="Drinks" pageOfDrinks />
      {categories.map((category, index) => (<Category
        btnName={ category.strCategory }
        key={ index }
      />))}
      {drinks.map((drink, index) => (<RecipeCard
        testIdCard={ `${index}-recipe-card` }
        testIdImg={ `${index}-card-img` }
        testIdName={ `${index}-card-name` }
        nameFood={ drink.strDrink }
        imgSrc={ drink.strDrinkThumb }
        key={ index }
      />))}
      <Footer />
    </main>
  );
}

export default Drinks;
