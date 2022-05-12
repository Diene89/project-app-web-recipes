import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { getFoods, getNationalitiesAPI,
  getFoodsByNationality } from '../services/RecipesAPI';
import './styles/FoodsNationalities.css';

function FoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const data = await getFoods();
      const recipesReceived = await data.meals;
      setRecipes(recipesReceived);
    } catch (error) {
      setRecipes(error);
    }
  };

  const getNationalities = async () => {
    try {
      const data = await getNationalitiesAPI();
      const nationalitiesReceived = await data.meals;
      /* const allOption = {
        strArea: 'All',
      };
      nationalitiesReceived.push(allOption); */
      setNationalities(nationalitiesReceived);
    } catch (error) {
      setNationalities(error);
    }
  };

  const getFoodsFiltered = async (area) => {
    if (area === 'All') {
      getRecipes();
    } else {
      try {
        const data = await getFoodsByNationality(area);
        const recipesReceived = await data.meals;
        setRecipes(recipesReceived);
      } catch (error) {
        setRecipes(error);
      }
    }
  };

  useEffect(() => { getNationalities(); getRecipes(); }, []);
  // useEffect(() => { getFoodsFiltered(); }, [nationalityFiltered]);
  const recipesQuantityLimit = 12;

  return (
    <main className="FoodsNationalities">
      <Header title="Explore Nationalities" />
      <div className="dropdown-container">
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ (e) => getFoodsFiltered(e.target.value) }
          className="explore-by-nationality-dropdown"
        >
          {nationalities.map((nationality, index) => (
            <option
              key={ index }
              data-testid={ `${nationality.strArea}-option` }
            >
              {nationality.strArea}
            </option>))}
          <option
            data-testid="All-option"
          >
            All
          </option>
        </select>
      </div>
      <div className="explore-by-nationality-cards">
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
      </div>

      <Footer />
    </main>
  );
}

export default FoodsNationalities;
