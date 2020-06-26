import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchCategories, searchMealsByName } from '../services/fetchMealAPI';

const Categories = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect( () => {
    fetchCategories(type)
      .then( data => setCategories((data['drinks'] || data['meals']).splice(0, 5)))
  }, [])

  // handleBtnClick = (category) => {
  //   (category === 'All' || category === currentFilter) ?
    
  // }

  return (
    <div>
      <button type='button'>All</button>
      {categories.map(category => 
        <button 
        data-testid={`${category.strCategory}-category-filter`} type='button'
        onClick={e => console.log(e.target.innerHTML)}
        >
          {category.strCategory}
        </button>)}
    </div>
  )
}

export default Categories;