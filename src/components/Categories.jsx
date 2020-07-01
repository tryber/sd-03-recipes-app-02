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
  const { saveRecipes, setIsFetching } = useContext(RecipesContext);

  useEffect(() => {
    getRecipeCategories(type)
      .then((data) => setCategories((data.drinks || data.meals).slice(0, 5)));
  }, [type]);

  useEffect(() => {
    if (currentFilter) {
      searchRecipesByCategory(currentFilter, type)
      .then((data) => {
        saveRecipes(data)
      });
    } else {
      searchRecipesByName('', type)
      .then((data) => {
        saveRecipes(data);
      });
    }
  }, [ currentFilter ]);

  const handleBtnClick = (category) => {
    if (category === 'All' || category === currentFilter) setCurrentFilter('');
    else setCurrentFilter(category);
  };

  return (
    <div className="categories">
      <button
        type="button" data-testid="All-category-filter"
        onClick={(e) => handleBtnClick(e.target.innerHTML)}
      >
        All
      </button>
      {categories.map((category) =>
        <button
          data-testid={`${category.strCategory}-category-filter`} type="button"
          onClick={(e) => handleBtnClick(e.target.innerHTML)}
        >
          {category.strCategory}
        </button>)}
    </div>
  );
};

Categories.propTypes = { type: PropTypes.string.isRequired };

export default Categories;
