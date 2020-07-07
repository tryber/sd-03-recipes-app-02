import React, { useState, useContext, useEffect } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const saveFavorite = (recipe, setFavoriteIcon) => {
  const { id, type, area, category, alcoholicOrNot, name, image } = recipe;
  const newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  console.log(type);
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

const FavoriteBtn = () => {
  const { recipes } = useContext(RecipesContext);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (recipes.length !== 0 && favorites.find((favorite) => favorite.id === recipes[0].id)) {
      setFavoriteIcon(blackHeartIcon);
    }
  }, [recipes]);

  return (
    <button className="invisible-btn" onClick={() => saveFavorite(recipes[0], setFavoriteIcon)}>
      <img data-testid="favorite-btn" src={favoriteIcon} alt="share" />
    </button>
  );
};

export default FavoriteBtn;
