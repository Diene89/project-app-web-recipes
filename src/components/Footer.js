import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <button
          data-testid="drinks-bottom-btn"
          type="button"
          alt="drinks-icon"
          className="tag-footer"
          src={ drinkIcon }
        >
          <img src={ drinkIcon } alt="drink-tag" />
        </button>
      </Link>
      <Link to="/explore">
        <button
          data-testid="explore-bottom-btn"
          type="button"
          alt="explore-icon"
          className="tag-footer"
          src={ exploreIcon }
        >
          <img src={ exploreIcon } alt="explore-icon" />
        </button>
      </Link>
      <Link to="/foods">
        <button
          data-testid="food-bottom-btn"
          type="button"
          alt="foods-icon"
          className="tag-footer"
          src={ mealIcon }
        >
          <img src={ mealIcon } alt="foods-icon" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
