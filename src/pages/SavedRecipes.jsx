import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SavedRecipesCard from '../components/SavedRecipesCard';

const filterButtons = (setFilter) => {
  const handleClick = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div className="margin-top-70p type-div">
      <button
        data-testid="filter-by-all-btn"
        type="button"
        className="btn filters-btn"
        value=""
        onClick={(e) => handleClick(e)}
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        className="btn filters-btn"
        value="comida"
        onClick={(e) => handleClick(e)}
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        className="btn filters-btn"
        value="bebida"
        onClick={(e) => handleClick(e)}
      >
        Drinks
      </button>
    </div>
  );
};

const displayRecipes = (filter, recipes, page, setRecipes) => (
  <div className="saved-content">
    {recipes
      .filter((recipe) => {
        if (filter) {
          return recipe.type === filter;
        }
        return true;
      })
      .map((recipe, index) => (
        <SavedRecipesCard
          recipes={recipes}
          recipe={recipe}
          page={page}
          index={index}
          setRecipes={setRecipes}
        />
      ))}
  </div>
);

const SavedRecipes = ({ title, page }) => {
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(page))) {
      setRecipes(JSON.parse(localStorage.getItem(page)));
    }
  }, [page]);
  return (
    <div>
      <Header title={title} searchEnabled={false} />
      {filterButtons(setFilter)}
      {displayRecipes(filter, recipes, page, setRecipes)}
    </div>
  );
};

SavedRecipes.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default SavedRecipes;
