import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceipeCard from '../components/RecipeCard';
import { getDrinks } from '../services/RecipesAPI';

function Drinks() {
  const [drinks, setDrinks] = useState([]);

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

  useEffect(() => { getRecipes(); }, []);

  return (
    <main className="Drink">
      <Header title="Drinks" />
      {drinks.map((drink, index) => (<ReceipeCard
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
