import React from 'react';

const MainCardMeal = () => {
  const { meal } = this.props;
  const { index, strMealThumb, strMeal } = meal;

  return (
    <Link to="/comidas/:id">
      <div data-testid={`${index}-recipe-card`}>
        <img data-testid={`${index}-card-img`} alt="Meal Photo" className="meal-image" src={strMealThumb} />
        <h4 data-testid={`${index}-card-name`} className="meal-title">{strMeal}</h4>
      </div>
    </Link>
  );
}

export default MainCardMeal;
