import React from 'react';
import NotFound from '../pages/NotFound';
import { render } from '@testing-library/react';

describe('NotFound.jsx tests', () => {
  test('renders icons with correct text', () => {
    const { getByText } = render(<NotFound />)

    const notFound = getByText(/Not Found/i);

    expect(notFound).toBeInTheDocument();
  })
})
