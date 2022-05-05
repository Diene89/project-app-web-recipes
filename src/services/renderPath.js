/* import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderPath = (path) => {
  const history = createBrowserHistory();
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources, history };
};

export default renderPath; */

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(component) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
  };
}
