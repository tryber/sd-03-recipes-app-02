import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

const Footer = () => (
  <footer>
    <nav data-testid="footer" className="footer ruby-bg">
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" alt="meal-icon" src={mealIcon} />
      </Link>
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" alt="drink-icon" src={drinkIcon} />
      </Link>
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" alt="explore-icon" src={exploreIcon} />
      </Link>
    </nav>
  </footer>
);

export default Footer;
