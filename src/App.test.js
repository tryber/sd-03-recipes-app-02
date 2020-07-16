import React from 'react';
import { render, fireEvent, waitForDomChange, act } from '@testing-library/react';
import App from './App';


test('Farewell, front-end', async () => {
  jest.setTimeout(30000);
  const { getByText, getByTestId } = render(<App />);
  const linkElement = getByText(/Login/i);
  const loginBtn = getByTestId(/login-submit-btn/i);
  const emailInput = getByTestId(/email-input/i);
  const passwordInput = getByTestId(/password-input/i);

  expect(linkElement).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456789' } });
  
  expect(loginBtn.disabled).toBe(false);

  fireEvent.click(loginBtn);

  await waitForDomChange();

  const foodsBtn = getByTestId(/food-bottom-btn/i);
  const drinksBtn = getByTestId(/drinks-bottom-btn/i);
  const exploreBtn = getByTestId(/explore-bottom-btn/i);

  expect(getByText(/Corba/i)).toBeInTheDocument();

  fireEvent.click(drinksBtn);
  await waitForDomChange();

  fireEvent.click(foodsBtn);
  await waitForDomChange();
  fireEvent.click(exploreBtn)
});