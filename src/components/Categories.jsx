import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getRecipeCategories,
  searchRecipesByName,
  searchRecipesByCategory,
} from '../services/fetchRecipes';
import { RecipesContext } from '../context/RecipesContext';

const Categories = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    getRecipeCategories(type)
      .then((data) => setCategories((data.drinks || data.meals).slice(0, 5)));
  }, [type]);

  useEffect(() => {
    if (currentFilter) {
      searchRecipesByCategory(currentFilter, type)
      .then((data) => setRecipes((data.drinks || data.meals).slice(0, 12)));
    } else {
      searchRecipesByName('', type)
      .then((data) => setRecipes((data.drinks || data.meals).slice(0, 12)));
    }
  }, [currentFilter, setRecipes, type]);

  const handleBtnClick = (category) => {
    if (category === 'All' || category === currentFilter) setCurrentFilter('');
    else setCurrentFilter(category);
  };

  return (
    <div className="categories">
      <button
        data-testid="All-category-filter"
        type="button" className="categories-btn btn"
        onClick={(e) => handleBtnClick(e.target.innerHTML)}
      >
        All
      </button>
      {categories.map((category) =>
        <button
          data-testid={`${category.strCategory}-category-filter`}
          type="button" className="categories-btn btn"
          onClick={(e) => handleBtnClick(e.target.innerHTML)}
        >
          {category.strCategory}
        </button>)}
    </div>
  );
};

Categories.propTypes = { type: PropTypes.string.isRequired };

export default Categories;
