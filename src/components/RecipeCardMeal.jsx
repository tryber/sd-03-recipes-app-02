import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCardMeal = ({ meal, index }) => {
  const { strMealThumb, strMeal, idMeal } = meal;

  return (
    <Link to={`/comidas/${idMeal}`}>
      <div data-testid={`${index}-recipe-card`}>
        <img data-testid={`${index}-card-img`} alt="Meal" className="meal-image" src={strMealThumb} />
        <h4 data-testid={`${index}-card-name`} className="meal-title">{strMeal}</h4>
      </div>
    </Link>
  );
};

RecipeCardMeal.propTypes = {
  meal: PropTypes.string.isRequired,
};

export default RecipeCardMeal;
