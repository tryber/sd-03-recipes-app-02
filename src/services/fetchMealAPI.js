export const getCategoriesMeal = () => fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getAreasMeal = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getIngredientsMeal = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealName = (meal) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealsFirstLetter = (letter) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealId = (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealRandom = () => fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealscategorie = (categorie) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
