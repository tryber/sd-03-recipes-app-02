import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCardDrink = ({ drink }) => {
  const { index, strDrinkThumb, strDrink, idDrink } = drink;

  return (
    <Link to={`/bebidas/${idDrink}`}>
      <div data-testid={`${index}-recipe-card`}>
        <img data-testid={`${index}-card-img`} alt="Drink" className="drink-image" src={strDrinkThumb} />
        <h4 data-testid={`${index}-card-name`} className="drink-title">{strDrink}</h4>
      </div>
    </Link>
  );
};

RecipeCardDrink.propTypes = {
  drink: PropTypes.string.isRequired,
};

export default RecipeCardDrink;
