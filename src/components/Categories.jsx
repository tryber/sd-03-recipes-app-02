import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchCategories } from '../services/fetchAPI';


// export async function fetchCategories(type) {
//   return fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?c=list`)
//     .then((categories) => categories
//       .json()
//       .then((json) => (categories.ok ? Promise.resolve(json) : Promise.reject(json))));
// }

const Categories = ({ type }) => {
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    (type === 'meal') ?
    fetchCategories(type)
      .then( data => setCategories([...data.meals.splice(0, 5)]))
    :
    fetchCategories(type)
      .then( data => setCategories([...data.drinks.splice(0, 5)]))
  }, [])

  return (
    <div>
      <button type='button'>All</button>
      {categories.map(category => 
        <button 
        data-testid={`${category.strCategory}-category-filter`} type='button'
        >
          {category.strCategory}
        </button>)}
    </div>
  )
}

export default Categories;