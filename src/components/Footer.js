import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drinks" />
      </Link>
      <Link to="/explore">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="explore" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="foods" />
      </Link>
    </footer>
  );
}

export default Footer;
