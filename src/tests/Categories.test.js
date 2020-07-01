import React from 'react';
import { fireEvent } from '@testing-library/react';
import Categories from '../components/Categories';
import MainRecipes from '../pages/MainRecipes';
import renderWithRouter from '../services/renderWithRouter';

describe('Categories.jsx (type =  meal) tests', () => {
  test('Checks if buttons render correctly', () => {
    const { getByText } = renderWithRouter(<Categories type="meal" />)

    const btnAll = getByText(/All/i);
    const btnBeef = getByText(/Beef/i);
    const btnBreakfast = getByText(/Breakfast/i);
    const btnChicken = getByText(/Chicken/i);
    const btnDessert = getByText(/Dessert/i);
    const btnGoat = getByText(/Goat/i);

    expect(btnAll).toBeInTheDocument();
    expect(btnBeef).toBeInTheDocument();
    expect(btnBreakfast).toBeInTheDocument();
    expect(btnChicken).toBeInTheDocument();
    expect(btnDessert).toBeInTheDocument();
    expect(btnGoat).toBeInTheDocument();
  })
  
  test('Checks if buttons filter correctly', () => {
    const { getByText } = renderWithRouter(
      <RecipesContext.Provider value={mock}>
        <MainRecipes type='meal' title='Comidas' />
      </RecipesContext.Provider>
    );

    const btnAll = getByText(/All/i);
    const btnBeef = getByText(/Beef/i);
    const btnBreakfast = getByText(/Breakfast/i);

    expect(getByText(/Corba/i)).toBeInTheDocument();
    expect(getByText(/Kumpir/i)).toBeInTheDocument();

    fireEvent.click(btnBeef);

    expect(getByText(/Beef and Mustard Pie/i)).toBeInTheDocument();
    expect(getByText(/Beef and Oyster Pie/i)).toBeInTheDocument();
    expect(getByText(/Corba/i)).not.toBeInTheDocument();
    expect(getByText(/Kumpir/i)).not.toBeInTheDocument();

    fireEvent.click(btnBreakfast);

    expect(getByText(/Beef and Mustard Pie/i)).not.toBeInTheDocument();
    expect(getByText(/Corba/i)).not.toBeInTheDocument();
    expect(getByText(/Breakfast Potatoes/i)).toBeInTheDocument();
    expect(getByText(/English Breakfast/i)).toBeInTheDocument();

    fireEvent.click(btnAll);

    expect(getByText(/Beef and Mustard Pie/i)).not.toBeInTheDocument();
    expect(getByText(/Breakfast Potatoes/i)).not.toBeInTheDocument();
    expect(getByText(/Corba/i)).toBeInTheDocument();
    expect(getByText(/Kumpir/i)).toBeInTheDocument();
  })
})