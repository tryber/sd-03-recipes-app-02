import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesContext from '../../context/RecipesContext';

const renderWithContext = (children, route = '/', path = route) => {
  const initialEntries = [route];
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <Router history={history}>
        <Route path={path}>
          <RecipesContext>{children}</RecipesContext>
        </Route>
      </Router>,
    ),
    history,
  };
};

export default renderWithContext;