export const ingredientsList = (recipe) => {
  const response = [];
  for (let index = 1; index < 21; index += 1) {
    if (recipe[`strIngredient${index}`]) {
      response.push({
        name: recipe[`strIngredient${index}`],
        quantity: recipe[`strMeasure${index}`],
      });
    } else {
      break;
    }
  }
  return response;
};

export const destructureRecipe = (recipe, type) => {
  const {
    [`id${type}`]: id,
    [`str${type}`]: name,
    strArea: area,
    strCategory: category,
    [`str${type}Thumb`]: image,
    strYoutube: youtube,
    strInstructions: instructions,
    strAlcoholic: alcoholicOrNot,
  } = recipe;
  const ingredients = ingredientsList(recipe);
  let tags = recipe.strTags;
  if (tags) tags = tags.split(',').slice(0, 2);
  return {
    id,
    type,
    name,
    area,
    category,
    alcoholicOrNot,
    image,
    ingredients,
    youtube,
    instructions,
    tags,
  };
};

export const svRecipes = (recipes) => {
  const data = recipes.meals || recipes.drinks;
  let type = '';
  if (recipes.meals) {
    type = 'Meal';
  } else {
    type = 'Drink';
  }
  return data.map((recipe) => destructureRecipe(recipe, type));
};
