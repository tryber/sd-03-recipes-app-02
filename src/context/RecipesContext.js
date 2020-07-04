import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { svRecipes } from '../utils/dataDestructure';

export const RecipesContext = createContext(null);

RecipesContext.displayName = 'RecipesContext';

const RecipesProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [explore, setExplore] = useState(false);

  const saveRecipes = (data) => setRecipes(svRecipes(data, setRecipes).slice(0, 12));

  const context = { 
    isFetching,
    setIsFetching,
    recipes,
    setRecipes, 
    saveRecipes,
    explore,
    setExplore
  };

  return <RecipesContext.Provider value={context}>{children}</RecipesContext.Provider>;
};

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
