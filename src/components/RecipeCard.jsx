import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, index, type }) => {
  const stringsObj = {
    meal: { path: 'comidas', uppercase: 'Meal' },
    cocktail: { path: 'bebidas', uppercase: 'Drink' },
  };
  return (
    <Link to={`/${stringsObj[type].path}/${recipe[`id${stringsObj[type].uppercase}`]}`}>
      <div data-testid={`${index}-recipe-card`} className="card">
        <img
          data-testid={`${index}-card-img`}
          alt="Recipe"
          className="recipe-image"
          src={recipe[`str${stringsObj[type].uppercase}Thumb`]}
        />
        <h4 data-testid={`${index}-card-name`} className="recipe-title">
          {recipe[`str${stringsObj[type].uppercase}`]}
        </h4>
      </div>
    </Link>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeCard;
