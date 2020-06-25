import React from 'react';

const MainCardMeal = () =>
  <div>
    <img data-testid={`${index}-card-img`} alt="Meal Photo" className="meal-image" src={strMealThumb} />
    <h4 data-testid={`${index}-card-name`} className="meal-title">{strMeal}</h4>
  </div>;

export default MainCardMeal;
