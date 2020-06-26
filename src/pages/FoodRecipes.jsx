import React from 'react';
import Header from '../components/Header';
import MainCardMeal from '../components/MainCardMeal';

const FoodRecipes = () => (
  <div>
    <Header title="Comidas" searchEnabled />
    <div>
      {meals.map((meal) => <MainCardMeal key={meal.idMeal} meal={meal} />)}
    </div>
  </div>
);

export default FoodRecipes;
