import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, index, type, page }) => {
  const stringsObj = {
    meal: { path: 'comidas', uppercase: 'Meal' },
    cocktail: { path: 'bebidas', uppercase: 'Drink' },
  };
  const dataTests = {
    mainPage: { card: `${index}-recipe-card`, title: `${index}-card-name` },
    detailPage: { card: `${index}-recomendation-card`, title: `${index}-recomendation-title` },
  };
  return (
    <Link to={`/${stringsObj[type].path}/${recipe[`id${stringsObj[type].uppercase}`]}`}>
      <div data-testid={dataTests[page].card} className="card">
        <img
          data-testid={`${index}-card-img`}
          alt="Recipe"
          className="recipe-image"
          src={recipe[`str${stringsObj[type].uppercase}Thumb`]}
        />
        <h4 data-testid={dataTests[page].title} className="recipe-title">
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
  page: PropTypes.string.isRequired,
};

export default RecipeCard;
