import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithContext from './services/renderWithContext';

localStorage.setItem('user', JSON.stringify({ email: 'henriquerezendec@gmail.com' }));
afterEach(cleanup);

describe('Explore.jsx tests', () => {
  test('Render correct buttons', () => {
    const { getByTestId } = renderWithContext(<Profile />);

    const profileEmail = getByTestId('profile-email');
    expect(profileEmail.textContent).toBe('henriquerezendec@gmail.com');

    const logoutBtn = getByTestId('profile-logout-btn');
    fireEvent.click(logoutBtn);
  });
});
