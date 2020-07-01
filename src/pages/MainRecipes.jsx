import React from 'react';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchRecipesByName } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import { RecipesContext } from '../context/RecipesContext';
import Categories from '../components/Categories';

const MainRecipes = ({ type, title }) => {
  const { isFetching, setIsFetching, recipes, setRecipes, saveRecipes } = useContext(RecipesContext);

  useEffect(() => {
    searchRecipesByName('', type).then((data) => {
      saveRecipes(data);
      setIsFetching(false);
    });
  }, [type]);

  const upperCase = {
    meal: 'Meal',
    cocktail: 'Drink',
  };

  if (isFetching) return <Loading />;
  return (
    <div>
      <Header title={title} type={type} searchEnabled />
      <Categories type={type} />
      <div className="recipes-display">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe[`id${upperCase[type]}`]}
            recipe={recipe}
            index={index}
            type={type}
            page="mainPage"
          />
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
