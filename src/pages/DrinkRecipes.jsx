import React from 'react';
import { useContext, useEffect } from 'react';

import { searchRecipesByName } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCardDrink from '../components/RecipeCardDrink';
import { RecipesContext } from '../context/RecipesContext';

const DrinkRecipes = () => {
  const { isFetching, setIsFetching, recipes, setRecipes } = useContext(RecipesContext);
  
  useEffect(() => {
    searchRecipesByName('', 'cocktail').then((data) => {
      setRecipes(data.drinks);
      setIsFetching(false);
    });
  },)

  return (
    <div>
      <Header title="Bebidas" type="cocktail" searchEnabled />
      <div>
        {recipes.slice(0, 12).map((drink) =>
        <RecipeCardDrink key={drink.idDrink} drink={drink} />)}
      </div>
      <Footer />
    </div>
  )
};

export default DrinkRecipes;
