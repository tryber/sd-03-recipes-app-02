import React from 'react';
import { useContext, useEffect } from 'react';

import { searchRecipesByName } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import { RecipesContext } from '../context/RecipesContext';

const FoodRecipes = () => {
  const { isFetching, setIsFetching, recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    searchRecipesByName('', 'meal').then((data) => {
      setRecipes(data.meals.slice(0, 12));
      setIsFetching(false);
    });
  }, []);

  if (isFetching) return <Loading />;
  return (
    <div>
      <Header title="Comidas" type="meal" searchEnabled />
      <div>
        {recipes.map((meal, index) => {
          return <RecipeCard key={meal.idMeal} recipe={meal} index={index} type="Meal" />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default FoodRecipes;
