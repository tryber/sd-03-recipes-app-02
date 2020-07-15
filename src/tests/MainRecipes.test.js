import React from 'react';
import { cleanup, waitForDomChange, fireEvent } from '@testing-library/react';
import MainRecipes from '../pages/MainRecipes';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals'
import fishes from './mocks/fishes';
import eggsMainIngredient from './mocks/eggsMainIngredient';
import aFirstLetter from './mocks/aFirstLetter';
import renderWithContext from './services/renderWithContext';

const URLs = {
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': meals,
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': mealCategories,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': beefMeals,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=fish': fishes,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=eggs': eggsMainIngredient,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=a': aFirstLetter,
}

jest.spyOn(global, 'fetch').mockImplementation((URL) =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(URLs[URL]),
  }),
);

const props = {
  match: {
    params: {
      id: '52977',
    },
  },
};

describe('MainRecipes.jsx tests', () => {
  afterEach(cleanup);
  beforeEach(() => fetch.mockClear())

  test('render correct cards', async () => {
    const { getByTestId } = renderWithContext(
      <MainRecipes {...props} type="meal" title="Comidas" />,
      '/comidas/52977',
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    await waitForDomChange();

    const card0 = getByTestId('0-card-name');
    expect(card0.textContent).toBe('Corba');
    const card11 = getByTestId('11-recipe-card');
    expect(card11).toBeInTheDocument();
  });

  test('categories buttons working', async () => {
    const { getByTestId } = renderWithContext(
      <MainRecipes {...props} type="meal" title="Comidas" />,
      '/comidas/52977',
    );

    await waitForDomChange();

    const btnAll = getByTestId('All-category-filter');
    expect(btnAll.textContent).toBe('All');

    const btnBeef = getByTestId('Beef-category-filter');
    expect(btnBeef.textContent).toBe('Beef');
    fireEvent.click(btnBeef);

    await waitForDomChange();

    const card0 = getByTestId('0-card-name');
    expect(card0.textContent).toBe('Beef and Mustard Pie');

    fireEvent.click(btnAll);

    await waitForDomChange();

    const newCard0 = getByTestId('0-card-name');
    expect(newCard0.textContent).toBe('Corba');
  });

  test('Search bar by name test', async () => {
    const { getByTestId } = renderWithContext(
      <MainRecipes {...props} type="meal" title="Comidas" />,
      '/comidas/52977',
    );

    await waitForDomChange();

    const searchBtn = getByTestId('search-top-btn');
    fireEvent.click(searchBtn);
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'fish' } })
    const execSearchBtn = getByTestId('exec-search-btn');
    fireEvent.click(execSearchBtn);

    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=fish');
  });

  test('Search bar by ingredient test', async () => {
    const { getByTestId } = renderWithContext(
      <MainRecipes {...props} type="meal" title="Comidas" />,
      '/comidas/52977',
    );

    await waitForDomChange();

    const searchBtn = getByTestId('search-top-btn');
    fireEvent.click(searchBtn);
    const nameRadio = getByTestId('ingredient-search-radio');
    fireEvent.click(nameRadio);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'eggs' } })
    const execSearchBtn = getByTestId('exec-search-btn');
    fireEvent.click(execSearchBtn);

    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=eggs');
  });

  test('Search bar by first letter test', async () => {
    const { getByTestId } = renderWithContext(
      <MainRecipes {...props} type="meal" title="Comidas" />,
      '/comidas/52977',
    );

    await waitForDomChange();

    const searchBtn = getByTestId('search-top-btn');
    fireEvent.click(searchBtn);
    const nameRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(nameRadio);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'a' } })
    const execSearchBtn = getByTestId('exec-search-btn');
    fireEvent.click(execSearchBtn);

    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
});
