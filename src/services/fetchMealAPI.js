export const getMealDetailedCategories = () => fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealCategories = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealAreas = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealIngredients = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealsByName = (meal) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealsByFirstLetter = (letter) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealById = (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getRandomMeal = () => fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealByCategory = (category) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
