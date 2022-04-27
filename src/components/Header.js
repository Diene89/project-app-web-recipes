import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearchIcon }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

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

  function renderSearchInput() {
    return (
      <>
        <input type="search" data-testid="search-input" />
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="search-type"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="search-type"
            id="name-search-radio"
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="search-type"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
        <button type="button" data-testid="exec-search-btn">Search</button>
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
            alt="profileIcou"
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
    </header>
  );
}

Header.defaultProps = {
  showSearchIcon: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool,
};

export default Header;
