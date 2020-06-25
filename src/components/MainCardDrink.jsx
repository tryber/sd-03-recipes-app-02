import React from 'react';

const MainCardDrink = () =>
  <div>
    <img data-testid={`${index}-card-img`} alt="Drink Photo" className="drink-image" src={strDrinkThumb} />
    <h4 data-testid={`${index}-card-name`} className="drink-title">{strDrink}</h4>
  </div>;

export default MainCardDrink;
