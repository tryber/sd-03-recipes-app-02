import React from 'react';

import * as fetchMealAPI from '../services/fetchMealAPI';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCardMeal from '../components/MainCardMeal';
import MainCardDrink from '../components/MainCardDrink';

const getCards = () =>
  (title="Comidas")
  ? (meals.slice(0, 12).map((meal) => <MainCardMeal key={meal.idMeal} meal={meal} />))
  : (drinks.slice(0, 12).map((drink) => <MainCardDrink key={drink.idDrink} drink={drink} />));

const FoodRecipes = () => {
  return (
    <div>
      <Header title="Comidas" searchEnabled />
      <div>
        {getCards()}
      </div>
      <Footer />
    </div>
  )
};

export default FoodRecipes;
