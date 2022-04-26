import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcou" />
      <span data-testid="page-title">Foods</span>
      <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
    </header>
  );
}

export default Header;
