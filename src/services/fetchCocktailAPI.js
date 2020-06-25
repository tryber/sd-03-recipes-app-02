export const getCocktailCategories = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getCocktailIngredients = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getCocktailsByName = (cocktail) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getCocktailsByFirstLetter = (letter) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getCocktailById = (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getRandomCocktail = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getCocktailsByCategory = (category) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
