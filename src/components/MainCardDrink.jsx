import React from 'react';

const MainCardDrink = () => {
  const { drink } = this.props;
  const { index, strDrinkThumb, strDrink } = drink;

  return (
    <Link to="/comidas/:id">
      <div data-testid={`${index}-recipe-card`}>
        <img data-testid={`${index}-card-img`} alt="Drink Photo" className="drink-image" src={strDrinkThumb} />
        <h4 data-testid={`${index}-card-name`} className="drink-title">{strDrink}</h4>
      </div>
    </Link>
  );
}

export default MainCardDrink;
