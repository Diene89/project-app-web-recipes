import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipeType from '../components/RecipeTypeBtn';
import DoneCard from '../components/DoneCard';

function DoneRecipes() {
  const [idCopied, setIdCopied] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);

  function getDoneRecipes() {
    const doneRecipesStored = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesStored);
  }

  function copyShare(url, id) {
    if (global.alert('Link copied!')) {
      copy(url);
      setIdCopied(id);
    }
  }

  const filterRecipes = (type) => {
    const doneRecipesStored = JSON.parse(localStorage.getItem('doneRecipes'));
    if (type === 'Food') {
      const recipes = doneRecipesStored.filter((recipe) => recipe.type === 'food');
      setDoneRecipes(recipes);
    }
    if (type === 'Drinks') {
      const recipes = doneRecipesStored.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(recipes);
    }
    if (type === 'All') {
      setDoneRecipes(doneRecipesStored);
    }
  };

  useEffect(() => { getDoneRecipes(); }, []);
  return (
    <main>
      <Header title="Done Recipes" showSearchIcon={ false } />
      <RecipeType
        btnName="All"
        testId="filter-by-all-btn"
        toFilter={ filterRecipes }
      />
      <RecipeType
        btnName="Food"
        testId="filter-by-food-btn"
        toFilter={ filterRecipes }
      />
      <RecipeType
        btnName="Drinks"
        testId="filter-by-drink-btn"
        toFilter={ filterRecipes }
      />
      {doneRecipes && doneRecipes.map((recipe, index) => (<DoneCard
        type={ recipe.type }
        nameRecipe={ recipe.name }
        imgSrc={ recipe.image }
        testIdCard={ `${index}-horizontal-image` }
        testIdImg={ `${index}-horizontal-image` }
        testIdName={ `${index}-horizontal-name` }
        detailPage={ recipe.type === 'food'
          ? `/foods/${recipe.id}` : `/drinks/${recipe.id}` }
        testIdCategory={ `${index}-horizontal-top-text` }
        categoryName={ recipe.category }
        nationality={ recipe.nationality }
        alcoholicOrNot={ recipe.alcoholicOrNot }
        done={ recipe.doneDate }
        index={ index }
        testIdShare={ `${index}-horizontal-share-btn` }
        tags={ recipe.tags }
        copied={ recipe.id === idCopied }
        toShare={ recipe.type === 'food'
          ? () => copyShare(`http://localhost:3000/foods/${recipe.id}`, recipe.id)
          : () => copyShare(`http://localhost:3000/drinks/${recipe.id}`, recipe.id) }
        key={ index }
      />
      ))}
    </main>
  );
}

export default DoneRecipes;
