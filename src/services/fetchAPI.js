export async function searchMealsByName(name) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((mealsList) => mealsList
      .json()
      .then((json) => (mealsList.ok ? Promise.resolve(json) : Promise.reject(json))));
}

export async function searchMealsByMainIngredient(ingredients) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    .then((mealsList) => mealsList
      .json()
      .then((json) => (mealsList.ok ? Promise.resolve(json) : Promise.reject(json))));
}

export async function searchMealsByFirstLetter(letter) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((mealsList) => mealsList
      .json()
      .then((json) => (mealsList.ok ? Promise.resolve(json) : Promise.reject(json))));
}

export async function searchMealsByCategory(category) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((mealsList) => mealsList
      .json()
      .then((json) => (mealsList.ok ? Promise.resolve(json) : Promise.reject(json))));
}

export async function searchMealsByArea(area) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${area}`)
    .then((mealsList) => mealsList
      .json()
      .then((json) => (mealsList.ok ? Promise.resolve(json) : Promise.reject(json))));
}

export async function lookupMealDetailsById(id) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((meals) => meals
      .json()
      .then((json) => (meals.ok ? Promise.resolve(json) : Promise.reject(json))));
}

export async function lookupRandomMetal() {
  return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((meals) => meals
      .json()
      .then((json) => (meals.ok ? Promise.resolve(json) : Promise.reject(json))));
}

// falta APIs: 'List all meal categories' e 'List all Categories, Area, Ingredients'