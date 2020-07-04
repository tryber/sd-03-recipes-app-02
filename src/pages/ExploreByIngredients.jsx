import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRecipeIngredients, searchRecipesByMainIngredients } from '../services/fetchRecipes';
import { RecipesContext } from '../context/RecipesContext';

const ExploreFoodsIngredients = ({ type, history, url }) => {
  const [ingredients, setIngredients] = useState([]);
  const { saveRecipes, setExplore, setIsFetching } = useContext(RecipesContext);
  
  useEffect(() => {
    getRecipeIngredients(type)
      .then((data) => setIngredients((data.meals || data.drinks).slice(0, 12)));
  }, [])

  const handleClick = (ingredient) => {
    searchRecipesByMainIngredients(ingredient, type)
      .then((data) => saveRecipes(data))
      .then(() => {setExplore(true); setIsFetching(false)})
      .then(() => history.push(`/${url}`))
  }

  return (
  <div>
    <Header title="Explorar Ingredientes" searchEnabled={false} />
    {ingredients.map((ingredient, index) => {
      const name = ingredient.strIngredient || ingredient.strIngredient1
      return (
        <div onClick={() => handleClick(name)} data-testid={`${index}-ingredient-card`}>
          <img 
            src={`https://www.the${type}db.com/images/ingredients/${name}-Small.png`} 
            alt={`${name} thumbnail`} data-testid={`${index}-card-img`}
          />
          <p data-testid={`${index}-card-name`}>{name}</p>
        </div>
      )
    })}
    <Footer />
  </div>
  )
};

export default withRouter(ExploreFoodsIngredients);
