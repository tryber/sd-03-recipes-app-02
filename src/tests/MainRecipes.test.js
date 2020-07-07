import React from 'react';
import { render, waitFor, waitForDomChange } from '@testing-library/react';
// import renderWithRouter from '../services/renderWithRouter';
import RecipesProvider from '../context/RecipesContext';
import MainRecipes from '../pages/MainRecipes';
import meals from '../../cypress/mocks/meals';

describe('When the page first renders.', () => {
  const tree = (
    <RecipesProvider>
      <MainRecipes type='meal' title='comidas' />
    </RecipesProvider>
  )

  test('Page have shows a loading message before API update.', () => {
    const { getByText } = render(tree);
    const loading = getByText('Carregando...');
    expect(loading).toBeInTheDocument();
  });

  test('Chamada da função mock', () => {
    meals.meals = jest.fn();

    meals.meals();
    expect(meals.meals).toHaveBeenCalled();
  })

  // test('Page have to render 12 recipe cards.', async () => {
  //   jest.spyOn(global, 'fetch')
  //     .mockImplementation(() => Promise.resolve({
  //       status: 200,
  //       ok: true,
  //       json: () => Promise.resolve(meals)
  //     }));

  //   const { getByText } = render(tree);
  //   const firstCard = getByText("Corba");
  //   const lastCard = getByText("Pancakes");
  //   const notACard = getByText("Kedgeree");

  //   await waitForDomChange();

  //   expect(firstCard).toBeInThedocument();
  //   expect(lastCard).toBeInThedocument();
  //   expect(notACard).not.toBeInThedocument();
  //   expect(global.fetch).toHaveBeenCalledTimes(1);  
  // });

  // test('Page have to render 12 recipe cards.', async () => {
  //   jest.spyOn(global, 'fetch')
  //     .mockImplementation(() => Promise.resolve({
  //       status: 200,
  //       ok: true,
  //       json: () => Promise.resolve(meals)
  //     }));

  //   const { getByTestId } = render(tree);

  //   await waitForDomChange();

  //   meals.meals.slice(0, 12).forEach((index) => {
  //     const card = getByTestId(`${index}-recipe-card`);
  //     expect(card).toBeInThedocument();
  //   })
  // });

  test('Page have to render 12 recipe cards.', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(meals)
      }));

    const { getByTestId } = render(tree);

    await waitForDomChange();

    meals.meals.slice(0, 12).forEach((index) => {
      const firstCard = getByTestId("0-recipe-card");
      const lastCard = getByTestId("11-recipe-card");
      const notACard = getByTestId("12-recipe-card");
  
      expect(firstCard).toBeInThedocument();
      expect(lastCard).toBeInThedocument();
      expect(notACard).not.toBeInThedocument();
    })
  });

  // test('Each rendered card have to have the name of the recipe.', () => {
    
  // });

  // test('Each rendered card have to have the image of the recipe.', () => {
    
  // });

  // test('Each rendered card have to have a link to its own recipe detail.', () => {

  // });
});
