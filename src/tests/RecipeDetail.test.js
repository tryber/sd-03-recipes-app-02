import React from 'react';
import {
  cleanup,
  waitForDomChange,
  fireEvent,
  queryAllByRole,
  getByTestId,
} from '@testing-library/react';
import Clipboard from './services/clipboard';
import RecipeDetail from '../pages/RecipeDetail';
import drinks from '../../cypress/mocks/drinks';
import corba from '../../cypress/mocks/oneMeal';
import renderWithContext from './services/renderWithContext';

navigator.clipboard = new Clipboard();

const URLs = {
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': drinks,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771': corba,
};

jest.spyOn(global, 'fetch').mockImplementation((URL) =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(URLs[URL]),
  }),
);

describe('RecipeDetail.jsx tests', () => {
  afterEach(cleanup);
  beforeEach(() => fetch.mockClear());

  test('render correct cards', async () => {
    const { getByTestId } = renderWithContext(
      <RecipeDetail type="meal" recommendedType="cocktail" page="detail" />,
      '/comidas/52771',
      '/comidas/:id',
    );

    await waitForDomChange();

    const card0 = getByTestId('recipe-title');
    expect(card0.textContent).toBe('Spicy Arrabiata Penne');
    const ingredient1 = getByTestId('0-ingredient-name-and-measure');
    expect(ingredient1.textContent).toBe('penne rigate - 1 pound');
  });

  test('favorite and share btn test', async () => {
    const { getByTestId, getByText } = renderWithContext(
      <RecipeDetail type="meal" recommendedType="cocktail" page="detail" />,
      '/comidas/52771',
      '/comidas/:id',
    );

    await waitForDomChange();

    const favoriteBtn = getByTestId('favorite-btn');
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');

    const shareBtn = getByTestId('share-btn');
    fireEvent.click(shareBtn);
    const copiedLink = getByText(/Link copiado!/);
    expect(copiedLink).toBeInTheDocument();
  });

  test('recipe in progress', async () => {
    const { queryAllByRole, getByTestId } = renderWithContext(
      <RecipeDetail type="meal" recommendedType="cocktail" page="inProgress" />,
      '/comidas/52771',
      '/comidas/:id',
    );

    await waitForDomChange();

    const checkboxes = queryAllByRole('checkbox');

    checkboxes.forEach((checkbox) => fireEvent.click(checkbox));

    const finishBtn = getByTestId('finish-recipe-btn');
    expect(finishBtn.disabled).toBe(false);

    fireEvent.click(finishBtn);
  });
});
