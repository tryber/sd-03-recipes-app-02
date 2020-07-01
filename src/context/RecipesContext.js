import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext(null);

RecipesContext.displayName = 'RecipesContext';

const RecipesProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const ingredientsList = (recipe) => {
    const response = [];
    for (let index = 1; index < 16; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        response.push({
          ingredient: recipe[`strIngredient${index}`],
          quantity: recipe[`strMeasure${index}`],
        });
      } else {
        break;
      }
    }
    return response;
  };

  const saveRecipes = (recipes) => {
    const data = recipes.meals || recipes.drinks;
    let type = '';
    if (recipes.meals) {
      type = 'Meal';
    } else {
      type = 'Drink';
    }
    type.toLowerCase();
    setRecipes(
      data.slice(0, 12).map((recipe) => {
        const {
          [`id${type}`]: id,
          [`str${type}`]: name,
          strArea: area,
          strCategory: category,
          [`str${type}Thumb`]: image,
          strYoutube: youtube,
          strInstructions: instructions,
          strTags: tags,
        } = recipe;
        const ingredients = ingredientsList(recipe);
        return { id, name, area, category, image, ingredients, youtube, instructions, tags };
      }),
    );
  };

  const context = { isFetching, setIsFetching, recipes, setRecipes, saveRecipes };

  return <RecipesContext.Provider value={context}>{children}</RecipesContext.Provider>;
};

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
