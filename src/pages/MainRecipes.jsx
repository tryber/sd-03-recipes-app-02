import React from 'react';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchRecipesByName } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import { RecipesContext } from '../context/RecipesContext';

const MainRecipes = ({ type, title }) => {
  const { isFetching, setIsFetching, recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    searchRecipesByName('', type).then((data) => {
      setRecipes((data.meals || data.drinks).slice(0, 12));
      setIsFetching(false);
    });
  }, []);

  const upperCase = {
    meal: 'Meal',
    cocktail: 'Drink',
  }

  if (isFetching) return <Loading />;
  return (
    <div>
      <Header title={title} type={type} searchEnabled />
      <div>
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe[`id${upperCase[type]}`]} recipe={recipe} index={index} type={type} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

MainRecipes.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MainRecipes;
