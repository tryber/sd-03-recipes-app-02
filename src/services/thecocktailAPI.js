export const getCategoriescocktail = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getIngredientscocktail = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getcocktailName = (cocktail) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getcocktailsFirstLetter = (letter) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getcocktailId = (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getcocktailRandom = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getcocktailscategorie = (categorie) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
