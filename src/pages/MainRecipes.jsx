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
  const {
    isFetching, setIsFetching, recipes, saveRecipes, explore, setExplore,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (!explore) {
      searchRecipesByName('', type).then((data) => {
        saveRecipes(data);
        setIsFetching(false);
      });
    }
    setExplore(false);
  }, [type]);

  if (isFetching) return <Loading />;
  return (
    <div>
      <Header title={title} type={type} searchEnabled />
      <Categories type={type} />
      <div className="recipes-display">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={index}
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
