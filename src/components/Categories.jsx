import React, { useState, useContext, useEffect} from 'react';
import { 
  getRecipeCategories, 
  searchRecipesByName, 
  searchRecipesByCategory 
} from '../services/fetchRecipes';
import { RecipesContext } from '../context/RecipesContext';

const Categories = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    getRecipeCategories(type)
      .then(data => setCategories((data['drinks'] || data['meals']).splice(0, 5)))
  }, [])

  const handleBtnClick = (category) => {
    (category === 'All' || category === currentFilter) ?
    searchRecipesByName('', type)
      .then(data => { setRecipes(data); setCurrentFilter(''); })
    :
    setCurrentFilter(category)
    searchRecipesByCategory(category, type)
      .then(data => setRecipes((data['drinks'] || data['meals'])))
  }


  return (
    <div>
      <button type='button' onClick={e => handleBtnClick(e.target.innerHTML)}>All</button>
      {categories.map(category => 
        <button 
        data-testid={`${category.strCategory}-category-filter`} type='button'
        onClick={e => handleBtnClick(e.target.innerHTML)}
        >
          {category.strCategory}
        </button>)}
    </div>
  )
}

export default Categories;