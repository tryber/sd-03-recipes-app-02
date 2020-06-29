import React, { useState, useContext, useEffect } from 'react';
import {
  getRecipeCategories,
  searchRecipesByName,
  searchRecipesByCategory,
} from '../services/fetchRecipes';
import PropTypes from 'prop-types';
import { RecipesContext } from '../context/RecipesContext';

const Categories = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    getRecipeCategories(type)
      .then((data) => setCategories((data.drinks || data.meals).splice(0, 5)));
  }, [type]);

  useEffect(() => {
    currentFilter ?
    searchRecipesByCategory(currentFilter, type)
      .then((data) => setRecipes((data.drinks || data.meals).splice(0, 12)))
    :
    searchRecipesByName('', type)
      .then((data) => setRecipes((data.drinks || data.meals).splice(0, 12)));
  }, [currentFilter, setRecipes, type]);

  const handleBtnClick = (category) => {
    category === 'All' || category === currentFilter ?
    setCurrentFilter('')
    :
    setCurrentFilter(category);
  };


  return (
    <div className="categories">
      <button type="button" onClick={(e) => handleBtnClick(e.target.innerHTML)}>All</button>
      {categories.map(category =>
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
