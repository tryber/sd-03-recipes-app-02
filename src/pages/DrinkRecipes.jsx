import React from 'react';
import { useContext, useEffect } from 'react';

import { searchRecipesByName } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import { RecipesContext } from '../context/RecipesContext';

const DrinkRecipes = () => {
  const { isFetching, setIsFetching, recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    searchRecipesByName('', 'cocktail').then((data) => {
      setRecipes(data.drinks);
      setIsFetching(false);
    });
  }, []);

  if (isFetching) return <Loading />;
  return (
    <div>
      <Header title="Bebidas" type="cocktail" searchEnabled />
      <div>
        {recipes.slice(0, 12).map((drink, index) =>
          <RecipeCard key={drink.idDrink} recipe={drink} index={index} type="Drink"/>)}
      </div>
      <Footer />
    </div>
  );
};

export default DrinkRecipes;
