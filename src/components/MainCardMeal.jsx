import React from 'react';

const MainCardMeal = () => {
  const { meal } = this.props;
  const { index, strMealThumb, strMeal, idMeal } = meal;

  return (
    <div>
      <img data-testid={`${index}-card-img`} alt="Meal Photo" className="meal-image" src={strMealThumb} />
      <h4 data-testid={`${index}-card-name`} className="meal-title">{strMeal}</h4>
      <Link className="meal-card-details" to={`/comidas/${idMeal}`}>VER DETALHES</Link>
    </div>
  );
}

export default MainCardMeal;
