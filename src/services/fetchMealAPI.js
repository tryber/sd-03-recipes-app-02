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

export const searchMealsByName = (meal) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchMealsByFirstLetter = (letter) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getMealDetailsById = (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getRandomMeal = () => fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchMealsByCategory = (category) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchMealsByArea = (area) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${area}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const searchMealsByMainIngredients = (ingredients) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  .then((response) => response.json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const fetchCategories = (type) => fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?c=list`)
    .then((categories) => categories.json()
    .then((json) => (categories.ok ? Promise.resolve(json) : Promise.reject(json))));

