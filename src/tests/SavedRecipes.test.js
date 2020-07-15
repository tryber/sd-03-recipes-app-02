import React from 'react';
import { cleanup, waitForDomChange, fireEvent } from '@testing-library/react';
import Clipboard from './services/clipboard';
import SavedRecipes from '../pages/SavedRecipes';
import renderWithContext from './services/renderWithContext';

navigator.clipboard = new Clipboard();

localStorage.setItem(
  'doneRecipes',
  JSON.stringify([
    {
      id: '52977',
      type: 'comida',
      area: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      doneDate: '08/07/2020',
      tags: ['Soup'],
    },
    {
      id: '13501',
      type: 'bebida',
      area: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: 'ABC',
      image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      doneDate: '08/07/2020',
      tags: null,
    },
    {
      id: '52802',
      type: 'comida',
      area: 'British',
      category: 'Seafood',
      alcoholicOrNot: '',
      name: 'Fish pie',
      image: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg',
      doneDate: '08/07/2020',
      tags: ['Fish', 'Pie'],
    },
    {
      id: '52804',
      type: 'comida',
      area: 'Canadian',
      category: 'Miscellaneous',
      alcoholicOrNot: '',
      name: 'Poutine',
      image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
      doneDate: '08/07/2020',
      tags: ['UnHealthy', 'Speciality'],
    },
    {
      id: '52978',
      type: 'comida',
      area: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Kumpir',
      image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
      doneDate: '08/07/2020',
      tags: ['SideDish'],
    },
    {
      id: '52929',
      type: 'comida',
      area: 'Canadian',
      category: 'Dessert',
      alcoholicOrNot: '',
      name: 'Timbits',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      doneDate: '08/07/2020',
      tags: ['Snack', 'Treat'],
    },
    {
      id: '13938',
      type: 'bebida',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Alcoholic',
      name: 'AT&T',
      image: 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg',
      doneDate: '09/07/2020',
      tags: null,
    },
  ]),
);

describe('SavedRecipes.jsx tests', () => {
  afterEach(cleanup);

  test('render done recipes', async () => {
    const { getByTestId } = renderWithContext(
      <SavedRecipes title="Receitas Feitas" page="doneRecipes" />,
      '/receitas-feitas',
    );

    const recipeImage = getByTestId('0-horizontal-image');
    expect(recipeImage.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
  });

  test('test filters', async () => {
    const { getByTestId } = renderWithContext(
      <SavedRecipes title="Receitas Feitas" page="doneRecipes" />,
      '/receitas-feitas',
    );

    const filterByDrinkBtn = getByTestId('filter-by-drink-btn');
    fireEvent.click(filterByDrinkBtn);

    let firstCardName = getByTestId('0-horizontal-name');
    expect(firstCardName.textContent).toBe('ABC');

    const filterByFoodBtn = getByTestId('filter-by-food-btn');
    fireEvent.click(filterByFoodBtn);

    firstCardName = getByTestId('0-horizontal-name');
    expect(firstCardName.textContent).toBe('Corba');

    const filterByAllBtn = getByTestId('filter-by-all-btn');
    fireEvent.click(filterByAllBtn);

    const secondCardName = getByTestId('1-horizontal-name');
    expect(secondCardName.textContent).toBe('ABC');
  });
});
