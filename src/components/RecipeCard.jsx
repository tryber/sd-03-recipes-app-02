import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, index, type, page }) => {
  const stringsObj = {
    meal: { path: 'comidas' },
    cocktail: { path: 'bebidas' },
  };
  const dataTests = {
    mainPage: { card: `${index}-recipe-card`, title: `${index}-card-name` },
    detailPage: { card: `${index}-recomendation-card`, title: `${index}-recomendation-title` },
  };
  return (
    <Link to={`/${stringsObj[type].path}/${recipe.id}`}>
      <div data-testid={dataTests[page].card} className="card">
        <img
          data-testid={`${index}-card-img`}
          alt="Recipe"
          className="recipe-image"
          src={recipe.image}
        />
        <span className="title-box">
          <h4 data-testid={dataTests[page].title} className="recipe-title">
            {recipe.name}
          </h4>
        </span>
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
