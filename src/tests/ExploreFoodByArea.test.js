import React from 'react';
import { cleanup, screen, fireEvent, act } from '@testing-library/react';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import fishes from './mocks/fishes';
import eggsMainIngredient from './mocks/eggsMainIngredient';
import aFirstLetter from './mocks/aFirstLetter';
import renderWithContext from './services/renderWithContext';
import ExploreFoodsArea from '../pages/ExploreFoodsByArea';
import areas from '../../cypress/mocks/areas';
import japaneseMeals from '../../cypress/mocks/japaneseMeals';

const URLs = {
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': meals,
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': mealCategories,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': beefMeals,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=fish': fishes,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=eggs': eggsMainIngredient,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=a': aFirstLetter,
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list': areas,
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese': japaneseMeals,
};

jest.spyOn(global, 'fetch').mockImplementation((URL) =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(URLs[URL]),
  }),
);

describe('ExploreFoodByArea.jsx tests', () => {
  afterEach(cleanup);
  beforeEach(() => fetch.mockClear());

  test('render correct cards', async () => {
    await act(async () => renderWithContext(<ExploreFoodsArea />, '/explorar/comidas/area'));

    const card0 = screen.getByTestId('0-card-name');
    expect(card0.textContent).toBe('Corba');
    const card11 = screen.getByTestId('11-recipe-card');
    expect(card11).toBeInTheDocument();

    const areaDropdown = screen.getByTestId('explore-by-area-dropdown');
    fireEvent.change(areaDropdown, { target: { value: 'Japanese' } });
    expect(fetch).toHaveBeenLastCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese',
    );
    fireEvent.change(areaDropdown, { target: { value: 'All' } });
    expect(fetch).toHaveBeenLastCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
  });
});
