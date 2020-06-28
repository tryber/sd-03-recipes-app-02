import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, index, type }) => {
  console.log('fui renderizado')
  const addresses = {
    Meal: 'comidas',
    Drink: 'bebidas',
  }
  return (
    <Link to={`/${addresses[type]}/${recipe[`id${type}`]}`}>
      <div data-testid={`${index}-recipe-card`}>
        <img
          data-testid={`${index}-card-img`}
          alt="Recipe"
          className="recipe-image"
          src={recipe[`str${type}Thumb`]}
        />
        <h4 data-testid={`${index}-card-name`} className="recipe-title">
          {recipe[`str${type}`]}
        </h4>
      </div>
    </Link>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeCard;
