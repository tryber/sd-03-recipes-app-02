import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext(null);

RecipesContext.displayName = 'RecipesContext';

const RecipesProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const saveRecipes = (recipes) => {

      setRecipes(recipes.meals || recipes.drinks)

  }

  const context = { isFetching, setIsFetching, recipes, setRecipes, saveRecipes };

  return <RecipesContext.Provider value={context}>{children}</RecipesContext.Provider>;
};

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
