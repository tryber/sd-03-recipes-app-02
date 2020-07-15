import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import ExploreRecipes from '../pages/ExploreRecipes';
import renderWithContext from './services/renderWithContext';
import oneMeal from '../../cypress/mocks/oneMeal';

const URLs = {
  'https://www.themealdb.com/api/json/v1/1/random.php': oneMeal,
}

jest.spyOn(global, 'fetch').mockImplementation((URL) =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(URLs[URL]),
  }),
);

afterEach(cleanup);

describe('Explore.jsx tests', () => {
  test('Render correct drink buttons', () => {
    const { getByTestId } = renderWithContext(<ExploreRecipes title="Explorar Comidas" url="comidas" type="meal" />)

    const exploreByIngredient = getByTestId("explore-by-ingredient");
    const exploreByArea = getByTestId("explore-by-area");
    const exploreSurprise = getByTestId("explore-surprise");

    expect(exploreByIngredient.textContent).toBe('Por Ingredientes');
    expect(exploreByArea.textContent).toBe('Por Local de Origem');
    expect(exploreSurprise.textContent).toBe('Me Surpreenda!');
  })

  test('Render correct drink buttons', () => {
    const { getByTestId } = renderWithContext(<ExploreRecipes title="Explorar Bebidas" url="bebidas" type="cocktail" />)

    const exploreByIngredient = getByTestId("explore-by-ingredient");
    const exploreSurprise = getByTestId("explore-surprise");

    expect(exploreByIngredient.textContent).toBe('Por Ingredientes');
    expect(exploreSurprise.textContent).toBe('Me Surpreenda!');
  })

  test('Random recipe button test', () => {
    const { getByTestId } = renderWithContext(<ExploreRecipes title="Explorar Comidas" url="comidas" type="meal" />)

    const exploreSurprise = getByTestId("explore-surprise");

    fireEvent.click(exploreSurprise);
    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
  })

})
