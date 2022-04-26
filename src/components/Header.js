import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearchIcon }) {
  return (
    <header>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcou" />
      <span data-testid="page-title">{title}</span>
      {
        showSearchIcon
        && <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
      }
    </header>
  );
}

Header.defaultProps = {
  showSearchIcon: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.string,
};

export default Header;
