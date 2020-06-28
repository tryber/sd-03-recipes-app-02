import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, index, type }) => {
  const stringsObj = {
    meal: ['comidas', 'Meal'],
    cocktail: ['bebidas', 'Drink'],
  };
  return (
    <Link to={`/${stringsObj[type][0]}/${recipe[`id${stringsObj[type][1]}`]}`}>
      <div data-testid={`${index}-recipe-card`}>
        <img
          data-testid={`${index}-card-img`}
          alt="Recipe"
          className="recipe-image"
          src={recipe[`str${stringsObj[type][1]}Thumb`]}
        />
        <h4 data-testid={`${index}-card-name`} className="recipe-title">
          {recipe[`str${stringsObj[type][1]}`]}
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
