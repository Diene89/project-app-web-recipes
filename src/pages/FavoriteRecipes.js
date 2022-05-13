import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import RecipeType from '../components/RecipeTypeBtn';

function FavoriteRecipes() {
  const [idCopied, setIdCopied] = useState('');
  const [favorites, setFavorites] = useState([]);

  function getFavorites() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteRecipes);
  }

  function copyShare(url, id) {
    if (url) {
      copy(url);
      setIdCopied(id);
    }
  }

  function notFavorite(id) {
    const favoriteRecipes = favorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavorites(favoriteRecipes);
  }

  const filterRecipes = (type) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'Food') {
      const recipes = favoriteRecipes.filter((recipe) => recipe.type === 'food');
      setFavorites(recipes);
    }
    if (type === 'Drinks') {
      const recipes = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
      setFavorites(recipes);
    }
    if (type === 'All') {
      setFavorites(favoriteRecipes);
    }
  };

  useEffect(() => { getFavorites(); }, []);

  return (
    <main>
      <Header title="Favorite Recipes" showSearchIcon={ false } />
      <section className="section-favorite-recipes">
        <RecipeType
          className="favorite-buttons"
          btnName="All"
          testId="filter-by-all-btn"
          toFilter={ filterRecipes }
        />
        <RecipeType
          className="favorite-buttons"
          btnName="Food"
          testId="filter-by-food-btn"
          toFilter={ filterRecipes }
        />
        <RecipeType
          className="favorite-buttons"
          btnName="Drinks"
          testId="filter-by-drink-btn"
          toFilter={ filterRecipes }
        />
      </section>

      <div className="div-favorite-recipes">
        {favorites && favorites.map((recipe, index) => (<FavoriteCard
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
          testIdShare={ `${index}-horizontal-share-btn` }
          testIdFavoriteBtn={ `${index}-horizontal-favorite-btn` }
          notFavorite={ () => notFavorite(recipe.id) }
          copied={ recipe.id === idCopied }
          toShare={ recipe.type === 'food'
            ? () => copyShare(`http://localhost:3000/foods/${recipe.id}`, recipe.id)
            : () => copyShare(`http://localhost:3000/drinks/${recipe.id}`, recipe.id) }
          key={ index }
        />
        ))}
      </div>
    </main>
  );
}

export default FavoriteRecipes;
