import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

beforeAll(() => {
  window.localStorage.setItem('user', '{"email":"user@email.com"}');
  window.localStorage.setItem('mealsToken', '1');
  window.localStorage.setItem('cocktailsToken', '1');
  window.localStorage.setItem('doneRecipes', '[]');
  window.localStorage.setItem('favoriteRecipes', '[]');
  window.localStorage.setItem('inProgressRecipes', '{}');
});

afterAll(() => {
  window.localStorage.clear();
});

const DONE_RECIPES = 'Done Recipes';
const FAVORITE_RECIPES = 'Favorite Recipes';
const LOGOUT = 'Logout';

describe('Verifica se é possível ir até a página de perfil', () => {
  test(`Altera a rota para /profile e espera
        pelo texto "Profile"`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');
  });
});

describe('Ao acessar a página de perfil o e-mail deve estar visível', () => {
  test('Verifica se o e-mail está visível', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');

    expect(await screen.findByText('user@email.com')).toBeInTheDocument();
  });
});

describe('A página de perfil deve ter 3 botões', () => {
  test(`Verifica se existe botões com os nomes "Done Recipes",
       "Favorite Recipes" e "Logout"`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(await screen.findByRole('button', { name: DONE_RECIPES }))
      .toBeInTheDocument();
    expect(await screen.findByRole('button', { name: FAVORITE_RECIPES }))
      .toBeInTheDocument();
    expect(await screen.findByRole('button', { name: LOGOUT }))
      .toBeInTheDocument();
  });
});

describe('Os botões devem redirecionar para a página correta ao serem clicados', () => {
  test(`Ao clicar no botão "Done Recipes" deve redirecionar
          para a página de receitas feitas`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const doneRecipesBtn = await screen.findByRole('button', { name: DONE_RECIPES });
    expect(doneRecipesBtn).toBeInTheDocument();

    userEvent.click(doneRecipesBtn);
    expect(await screen.findByRole('heading', { name: DONE_RECIPES }))
      .toBeInTheDocument();
  });

  test(`Ao clicar no botão "Favorite Recipes" deve redirecionar
          para a página de receitas favoritas`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const favoriteRecipesBtn = await screen
      .findByRole('button', { name: FAVORITE_RECIPES });
    expect(favoriteRecipesBtn).toBeInTheDocument();

    userEvent.click(favoriteRecipesBtn);
    expect(await screen.findByRole('heading', { name: FAVORITE_RECIPES }))
      .toBeInTheDocument();
  });

  test(`Ao clicar no botão "Logout" deve redirecionar para a página de login
          e o localStorage deve ser limpo`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const logoutBtn = await screen.findByRole('button', { name: LOGOUT });
    expect(logoutBtn).toBeInTheDocument();

    expect(window.localStorage.getItem('user')).toBe('{"email":"user@email.com"}');
    expect(window.localStorage.getItem('mealsToken')).toBe('1');
    expect(window.localStorage.getItem('cocktailsToken')).toBe('1');
    expect(window.localStorage.getItem('doneRecipes')).toBe('[]');
    expect(window.localStorage.getItem('favoriteRecipes')).toBe('[]');
    expect(window.localStorage.getItem('inProgressRecipes')).toBe('{}');

    userEvent.click(logoutBtn);
    expect(await screen.findByRole('heading', { name: 'Login' }))
      .toBeInTheDocument();

    expect(window.localStorage.getItem('user')).toBeNull();
    expect(window.localStorage.getItem('mealsToken')).toBeNull();
    expect(window.localStorage.getItem('cocktailsToken')).toBeNull();
    expect(window.localStorage.getItem('doneRecipes')).toBeNull();
    expect(window.localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(window.localStorage.getItem('inProgressRecipes')).toBeNull();
  });
});
