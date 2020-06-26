import React from 'react';

import * as fetchMealAPI from '../services/fetchMealAPI';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCardMeal from '../components/MainCardMeal';

const FoodRecipes = () => {
  return (
    <div>
      <Header title="Comidas" searchEnabled />
      <div>
        {meals.slice(0, 12).map((meal) => <MainCardMeal key={meal.idMeal} meal={meal} />)}
      </div>
      <Footer />
    </div>
  )
};

export default FoodRecipes;
