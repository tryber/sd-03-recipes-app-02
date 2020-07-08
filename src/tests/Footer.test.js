import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from '../services/renderWithRouter';

describe('Footer.jsx tests', () => {
  test('renders icons with correct img', () => {
    const { getByAltText } = renderWithRouter(<Footer />)

    const mealIcon = getByAltText(/meal-icon/i);
    const drinkIcon = getByAltText(/drink-icon/i);
    const exploreIcon = getByAltText(/explore-icon/i);

    expect(mealIcon.src).toBe('http://localhost/mealIcon.svg');
    expect(drinkIcon.src).toBe('http://localhost/drinkIcon.svg');
    expect(exploreIcon.src).toBe('http://localhost/exploreIcon.svg');
  })

  test('icons redirect properly', () => {
    const { getByTestId } = renderWithRouter(<Footer />)

    const mealLink = getByTestId('meals-link');
    const drinkLink = getByTestId('drinks-link');
    const exploreLink = getByTestId('explore-link');

    expect(mealLink.href).toBe('http://localhost/comidas');
    expect(drinkLink.href).toBe('http://localhost/bebidas');
    expect(exploreLink.href).toBe('http://localhost/explorar');
  })
})
