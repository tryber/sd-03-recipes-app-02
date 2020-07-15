import React from 'react';
import { cleanup, waitForDomChange, fireEvent } from '@testing-library/react';
import LocalStorage from './services/localStorage';
import renderWithContext from './services/renderWithContext';
import SavedRecipes from '../pages/SavedRecipes';

localStorage = new LocalStorage();
localStorage.setItem('doneRecipes', '[{"id":"53013","type":"comida","area":"American","category":"Beef","alcoholicOrNot":"","name":"Big Mac","image":"https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg","doneDate":"15/07/2020","tags":null},{"id":"52977","type":"comida","area":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg","doneDate":"15/07/2020","tags":["Soup"]},{"id":"14229","type":"bebida","area":"","category":"Shot","alcoholicOrNot":"Alcoholic","name":"747","image":"https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg","doneDate":"15/07/2020","tags":null}]');
localStorage.setItem('favoriteRecipes', '[{"id":"53013","type":"comida","area":"American","category":"Beef","alcoholicOrNot":"","name":"Big Mac","image":"https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"},{"id":"52977","type":"comida","area":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"},{"id":"17222","type":"bebida","area":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg"},{"id":"14229","type":"bebida","area":"","category":"Shot","alcoholicOrNot":"Alcoholic","name":"747","image":"https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg"}]');

describe('Saved recipes test', () => {
  test('Receitas feitas', () => {
    const { getByText } = renderWithContext(
      <SavedRecipes title="Receitas Feitas" page="doneRecipes" />
    );

    const bigmac = getByText(/Big Mac/i);
    const corba = getByText(/Corba/i);
    const drink = getByText(/747/i);

    expect(bigmac).toBeInTheDocument();
    expect(corba).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
  });

  test('Receitas favoritas', () => {
    const { getByTestId, queryByText } = renderWithContext(
      <SavedRecipes title="Receitas Favoritas" page="favoriteRecipes" />
    );

    const bigmac = queryByText(/Big Mac/i);
    const corba = queryByText(/Corba/i);
    const drink747 = queryByText(/747/i);
    const drinkA1 = queryByText(/A1/i);

    expect(bigmac).toBeInTheDocument();
    expect(corba).toBeInTheDocument();
    expect(drink747).toBeInTheDocument();
    expect(drinkA1).toBeInTheDocument();

    const bigmacFavBtn = getByTestId('0-horizontal-favorite-btn');

    fireEvent.click(bigmacFavBtn);

    expect(queryByText(/Big Mac/i)).not.toBeInTheDocument();
    expect(queryByText(/Corba/i)).toBeInTheDocument();
    expect(queryByText(/747/i)).toBeInTheDocument();
    expect(queryByText(/A1/i)).toBeInTheDocument();

    const drinkA1FavBtn = getByTestId('1-horizontal-favorite-btn');

    fireEvent.click(drinkA1FavBtn);

    expect(queryByText(/A1/i)).not.toBeInTheDocument();
    expect(queryByText(/Big Mac/i)).not.toBeInTheDocument();
    expect(queryByText(/Corba/i)).toBeInTheDocument();
    expect(queryByText(/747/i)).toBeInTheDocument();
  });

  test('Filter buttons', () => {
    const { getByTestId, queryByText } = renderWithContext(
      <SavedRecipes title="Receitas Favoritas" page="favoriteRecipes" />
    );

    const bigmac = queryByText(/Big Mac/i);

    expect(bigmac).toBeInTheDocument();
  })
})