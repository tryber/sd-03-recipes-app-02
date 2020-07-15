import React from 'react';
import { cleanup, waitForDomChange } from '@testing-library/react';
import Explore from '../pages/Explore';
import renderWithContext from './services/renderWithContext';

afterEach(cleanup);

describe('Explore.jsx tests', () => {
  test('Render correct buttons', () => {
    const { getByTestId } = renderWithContext(<Explore />)

    const exploreFoodBtn = getByTestId("explore-food");
    const exploreDrinkBtn = getByTestId("explore-drinks");

    expect(exploreFoodBtn.textContent).toBe('Explorar Comidas');
    expect(exploreDrinkBtn.textContent).toBe('Explorar Bebidas');
  })
})
