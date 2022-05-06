import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Verifica se é possível ir até a tela de explorar', () => {
  test('Altera a rota para /explore e espera pelo texto Explore', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Explore');
  });
});

describe('Testa a tela de explorar', () => {
  test('Verifica se os botões de redirecionar existem', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    screen.findByTestId('explore-foods');
    screen.findByTestId('explore-drinks');
  });
});

describe('Testa os botões de redirecionar', () => {
  test(`Ao clicar no botão de explorar comidas a rota
        deve mudar para /explore/foods`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const exploreFoodsBtn = await screen.findByTestId('explore-foods');
    userEvent.click(exploreFoodsBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods');
  });

  test(`Ao clicar no botão de explorar bebidas a rota
        deve mudar para /explore/drinks`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const exploreDrinksBtn = await screen.findByTestId('explore-drinks');
    userEvent.click(exploreDrinksBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks');
  });
});
