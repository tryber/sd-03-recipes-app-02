import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const saveFavorite = (recipe, setFavoriteIcon) => {
  const { id, type, area, category, alcoholicOrNot, name, image } = recipe;
  const newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const typeObj = {
    Drink: 'bebida',
    Meal: 'comida',
  };

  const favoriteIndex = newFavorites.findIndex((favorite) => favorite.id === recipe.id);
  if (favoriteIndex === -1) {
    newFavorites.push({
      id,
      type: typeObj[type],
      area: area || '',
      category: category || '',
      alcoholicOrNot: alcoholicOrNot || '',
      name,
      image,
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteIcon(blackHeartIcon);
  } else {
    newFavorites.splice(favoriteIndex, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteIcon(whiteHeartIcon);
  }
};

const FavoriteBtn = ({ dataTestId, recipe }) => {
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (
      favorites.find((favorite) => favorite.id === recipe.id)
    ) {
      setFavoriteIcon(blackHeartIcon);
    }
  }, [recipe]);

  return (
    <button className="invisible-btn" onClick={() => saveFavorite(recipe, setFavoriteIcon)}>
      <img data-testid={dataTestId} src={favoriteIcon} alt="share" />
    </button>
  );
};

FavoriteBtn.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FavoriteBtn;
