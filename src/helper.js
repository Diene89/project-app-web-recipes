import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (route) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{route}</Router>),
    history,
  });
};

export default renderWithRouter;
