import React from 'react';
import { useContext, useEffect } from 'react';

import { searchRecipesByName } from '../services/fetchRecipes';

import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCardMeal from '../components/RecipeCardMeal';
import { RecipesContext } from '../context/RecipesContext';

const FoodRecipes = () => {
  const { isFetching, setIsFetching, recipes, setRecipes } = useContext(RecipesContext);
  
  useEffect(() => {
    searchRecipesByName('', 'meal').then((data) => {
      setRecipes(data.meals);
      setIsFetching(false);
    });
  }, [])

  return (
    <div>
      <Header title="Comidas" type="meal" searchEnabled />
      <div>
        {recipes.slice(0, 12).map((meal) => <RecipeCardMeal key={meal.idMeal} meal={meal} />)}
      </div>
      <Footer />
    </div>
  )
};

export default FoodRecipes;
