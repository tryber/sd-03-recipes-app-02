export const getRecipeDetailedCategories = (type) => fetch(`https://www.the${type}db.com/api/json/v1/1/categories.php`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getRecipeCategories = (type) => fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?c=list`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getRecipeAreas = (type) => fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?a=list`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));, type

export const getRecipeIngredients = (type) => fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?i=list`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchRecipesByName = (meal, type) => fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=${meal}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchRecipesByFirstLetter = (letter, type) => fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?f=${letter}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getRecipeDetailsById = (id, type) => fetch(`https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getRandomRecipe = (type) => fetch(`https://www.the${type}db.com/api/json/v1/1/random.php`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchRecipesByCategory = (category, type) => fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchRecipesByArea = (area, type) => fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?f=${area}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchRecipesByMainIngredients = (ingredients, type) => fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingredients}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
