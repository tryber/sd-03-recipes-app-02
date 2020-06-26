import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext(null);

RecipesContext.displayName = 'RecipesContext';

const RecipesProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const context = { isFetching, setIsFetching, recipes, setRecipes };

  return <RecipesContext.Provider value={context}>{children}</RecipesContext.Provider>;
};

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
