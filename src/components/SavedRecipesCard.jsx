import React from 'react';
import { Link } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

const renderImage = (type, id, image, index) => (
  <Link to={`${type}s/${id}`}>
    <img alt="recipe" src={image} data-testid={`${index}-horizontal-image`} height="143px" />
  </Link>
);

const renderName = (type, id, name, index) => (
  <Link to={`${type}s/${id}`} className="recipe-name margin-left-10p">
    <span data-testid={`${index}-horizontal-name`}>{name}</span>
  </Link>
);

const tagsList = (tags, index) => {
  if (tags && tags.length !== 0) {
    return tags.map((tag) => (
      <span className="done-card-tag" data-testid={`${index}-${tag}-horizontal-tag`}>
        {tag}
      </span>
    ));
  }
  return null;
};

const renderCategory = (index, type, area, category, alcoholicOrNot) => (
  <span
    data-testid={`${index}-horizontal-top-text`}
    className="category-text margin-left-10p margin-top-10p"
  >
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
  <div className="saved-cards blue-text">
    {renderImage(type, id, image, index)}

    <div className="done-content">
      <span className="done-card-header">
        {renderCategory(index, type, area, category, alcoholicOrNot)}
        <ShareBtn dataTestId={`${index}-horizontal-share-btn`} id={id} type={type} />
      </span>
      <span className="done-name">{renderName(type, id, name, index)}</span>
      <span data-testid={`${index}-horizontal-done-date`} className="margin-left-10p">
        Feita em: {doneDate}
      </span>
      <span className="done-tags">{tagsList(tags, index)}</span>
    </div>
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
  <div className="saved-cards blue-text">
    {renderImage(type, id, image, index)}
    <div className="saved-cards-contend">
      {renderCategory(index, type, area, category, alcoholicOrNot)}
      {renderName(type, id, name, index)}
      <div className="btns-div">
        <ShareBtn dataTestId={`${index}-horizontal-share-btn`} id={id} type={type} />
        <button
          type="button"
          className="invisible-btn"
          onClick={() => setRecipes(recipes.filter((element) => element.id !== id))}
        >
          <FavoriteBtn dataTestId={`${index}-horizontal-favorite-btn`} recipe={recipe} />
        </button>
      </div>
    </div>
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
