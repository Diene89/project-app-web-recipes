import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';

function Header({ title, showSearchIcon, pageOfDrinks }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('Ingredient');
  const { recipes, searchRecipesBy, isFiltered } = useContext(AppContext);

  function handleSearchInput({ target: { value } }) {
    setSearch(value);
  }

  function handleSearchType({ target: { value } }) {
    setSearchType(value);
  }

  function renderSearchIcon() {
    return (
      <button
        type="button"
        onClick={
          () => (setShowSearchInput((currentShowSearchInput) => !currentShowSearchInput))
        }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
      </button>
    );
  }

  function redirect() {
    /* const recipesReceived = pageOfDrinks ? recipes.drinks : recipes.meals; */
    const recipesReceived = recipes;
    if (recipesReceived && recipesReceived.length === 1) {
      const url = pageOfDrinks
        ? `/drinks/${recipesReceived[0].idDrink}`
        : `/foods/${recipesReceived[0].idMeal}`;
      return <Redirect to={ url } />;
    }
    return null;
  }

  function renderSearchInput() {
    return (
      <>
        <input
          type="search"
          data-testid="search-input"
          value={ search }
          onChange={ handleSearchInput }
        />
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="search-type"
            value="Ingredient"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            checked={ searchType === 'Ingredient' }
            onChange={ handleSearchType }
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="search-type"
            value="Name"
            id="name-search-radio"
            data-testid="name-search-radio"
            checked={ searchType === 'Name' }
            onChange={ handleSearchType }
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="search-type"
            value="First Letter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            checked={ searchType === 'First Letter' }
            onChange={ handleSearchType }
          />
          First Letter
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => { searchRecipesBy(searchType, search, pageOfDrinks); } }
        >
          Search
        </button>
      </>
    );
  }

  return (
    <header>
      <Link to="/profile">
        <button type="button">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profileIcon"
          />
        </button>
      </Link>
      <span data-testid="page-title">{title}</span>
      {
        showSearchIcon
        && renderSearchIcon()
      }
      {
        showSearchInput
        && renderSearchInput()
      }
      { isFiltered === false ? redirect() : null }
    </header>
  );
}

Header.defaultProps = {
  showSearchIcon: true,
  pageOfDrinks: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool,
  pageOfDrinks: PropTypes.bool,
};

export default Header;
