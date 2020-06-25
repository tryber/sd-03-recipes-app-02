import React, { createContext, useState } from 'react';

export const RecipesContext = createContext(null);

RecipesContext.displayName = 'RecipesContext';

const RecipesProvider = ({ children }) => {
  const [ isFetching, setIsFetching ] = useState(true);
  const [ recipes, setRecipes ] = useState([]);

  const context = { isFetching, setIsFetching, recipes, setRecipes };

  return <RecipesContext.Provider value={context}>{children}</RecipesContext.Provider>;
}

PlanetsProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
