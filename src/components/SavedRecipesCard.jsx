import React from 'react';
import { Link } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

const tagsList = (tags, index) => {
  if (tags && tags.length !== 0) {
    return tags.map((tag) => <span data-testid={`${index}-${tag}-horizontal-tag`}>{tag}</span>);
  }
  return null;
};

const renderLink = (type, id, image, index, name) => (
  <Link to={`${type}s/${id}`}>
    <img alt="recipe" src={image} data-testid={`${index}-horizontal-image`} width="160px" />
    <span data-testid={`${index}-horizontal-name`}>{name}</span>
  </Link>
);

const renderCategory = (index, type, area, category, alcoholicOrNot) => (
  <span data-testid={`${index}-horizontal-top-text`}>
    {type === 'comida' ? `${area || ''} - ${category}` : alcoholicOrNot}
  </span>
);

const doneRecipe = (
  name,
  type,
  alcoholicOrNot,
  image,
  area,
  category,
  doneDate,
  tags,
  id,
  index,
) => (
  <div>
    {renderLink(type, id, image, index, name)}
    <div>
      {renderCategory(index, type, area, category, alcoholicOrNot)}
      <ShareBtn dataTestId={`${index}-horizontal-share-btn`} id={id} type={type} />
    </div>
    <span data-testid={`${index}-horizontal-done-date`}>{doneDate}</span>
    {tagsList(tags, index)}
  </div>
);

const favoriteRecipe = (
  name,
  type,
  alcoholicOrNot,
  image,
  area,
  category,
  id,
  index,
  recipe,
  setRecipes,
  recipes,
) => (
  <div>
    {renderLink(type, id, image, index, name)}
    {renderCategory(index, type, area, category, alcoholicOrNot)}
    <ShareBtn dataTestId={`${index}-horizontal-share-btn`} id={id} type={type} />
    <button
      type="button"
      onClick={() => setRecipes(recipes.filter((element) => element.id !== id))}
    >
      <FavoriteBtn dataTestId={`${index}-horizontal-favorite-btn`} recipe={recipe} />
    </button>
  </div>
);

const SavedRecipesCard = ({
  recipe: { name, type, alcoholicOrNot, image, area, category, doneDate, tags, id },
  recipe,
  page,
  index,
  setRecipes,
  recipes,
}) => {
  if (page === 'doneRecipes') {
    return doneRecipe(name, type, alcoholicOrNot, image, area, category, doneDate, tags, id, index);
  }
  return favoriteRecipe(
    name,
    type,
    alcoholicOrNot,
    image,
    area,
    category,
    id,
    index,
    recipe,
    setRecipes,
    recipes,
  );
};

export default SavedRecipesCard;
