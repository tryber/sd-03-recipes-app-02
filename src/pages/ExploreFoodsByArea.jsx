import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRecipeAreas, searchRecipesByArea, searchRecipesByName } from '../services/fetchRecipes';
import { RecipesContext } from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';

const ExploreFoodsArea = () => {
  const [areas, setAreas] = useState([]);
  const { recipes, saveRecipes } = useContext(RecipesContext);
  

  useEffect(() => {
    searchRecipesByName('', 'meal')
      .then((data) => saveRecipes(data))
    getRecipeAreas('meal')
      .then((data) => setAreas(data.meals))
  }, [])

  const handleSelect = (value) => {
    if(value === 'All') {
      searchRecipesByName('', 'meal')
        .then((data) => saveRecipes(data))
    } else {
      searchRecipesByArea(value)
        .then((data) => saveRecipes(data))
    }
  }

  return (
  <div style={{marginTop: '70px'}}>
    <Header title="Explorar Origem" type="meal" searchEnabled />
    <select data-testid="explore-by-area-dropdown" onChange={(e) => handleSelect(e.target.value)}>
      <option data-testid="All-option">All</option>
      {areas.map((e) => <option data-testid={`${e.strArea}-option`}>{e.strArea}</option>)}
    </select>
    {<div className="recipes-display">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={index}
            type='meal'
            page="mainPage"
          />
        ))}
      </div>}
    <Footer />
  </div>
  )
};

export default ExploreFoodsArea;
