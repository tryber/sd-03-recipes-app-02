import React from 'react';
import { cleanup, waitForDomChange, fireEvent } from '@testing-library/react'
import ExploreByIngredients from '../pages/ExploreByIngredients';
import renderWithContext from './services/renderWithContext';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import ginDrinks from '../../cypress/mocks/ginDrinks';

const URLs = {
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list': drinkIngredients,
  'https://www.themealdb.com/api/json/v1/1/list.php?i=list': mealIngredients,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken': chickenMeals,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin': ginDrinks,
}

jest.spyOn(global, 'fetch').mockImplementation((URL) =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(URLs[URL]),
  }),
);

describe('Meal by Ingredients', () => {
  test('Renders correct cards', async () => {
    const { getByText, queryByText } = renderWithContext(<ExploreByIngredients type="meal" url="comidas" />);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    );

    await waitForDomChange();

    expect(getByText(mealIngredients.meals[0].strIngredient)).toBeInTheDocument();
    expect(getByText(mealIngredients.meals[11].strIngredient)).toBeInTheDocument();
    expect(queryByText(mealIngredients.meals[12].strIngredient)).not.toBeInTheDocument();
  })

  test('Ingredients cards function properly', async () => {
    const { getByText, queryByText } = renderWithContext(
      <ExploreByIngredients type="meal" url="comidas" />
    );

    await waitForDomChange();
    
    const chicken = getByText(mealIngredients.meals[0].strIngredient);
    fireEvent.click(chicken)
    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken',
    );
  })
})