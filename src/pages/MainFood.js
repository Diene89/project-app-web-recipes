import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceipeCard from '../components/RecipeCard';
import { getFoods } from '../services/RecipesAPI';

function MainFood() {
  const [foods, setFoods] = useState([]);

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

  useEffect(() => { getRecipes(); }, []);

  return (
    <main className="MainFood">
      <Header title="Foods" />
      {foods.map((food, index) => (<ReceipeCard
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
