import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper';
import App from '../App';
import fetch from './mocks/fetch';

const linkCopied = 'http://localhost:3000/foods/52977';

beforeEach(() => {
  global.fetch = jest.fn(fetch);
  window.navigator.clipboard = {
    readText: jest.fn(() => Promise.resolve(linkCopied)),
    writeText: jest.fn((text) => Promise.resolve(text)),
  };
  const favoriteRecipes = [
    {
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'food',
    },
    {
      alcoholicOrNot: 'Alcoholic',
      category: 'Shake',
      id: '14588',
      image: 'https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg',
      name: 'FloridaBushwacker',
      nationality: '',
      type: 'drink',
    },
  ];
  window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

describe('Tela de Receitas favoritas', () => {
  test('verifica se todos os componentes estão presentes e se é possível desfavoritar',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/favorite-recipes');
      const pageTitle = await screen.findByTestId('page-title');
      const allButton = await screen.findByTestId('filter-by-all-btn');
      const foodButton = await screen.findByTestId('filter-by-food-btn');
      const drinkButton = await screen.findByTestId('filter-by-drink-btn');
      const nameRecipe0 = await screen.findByTestId('0-horizontal-name');
      const nameRecipe1 = await screen.findByTestId('1-horizontal-name');
      const favoriteButton = await screen.findByTestId('0-horizontal-favorite-btn');

      expect(pageTitle).toContainHTML('Favorite Recipes');
      expect(allButton).toBeInTheDocument();
      expect(foodButton).toBeInTheDocument();
      expect(drinkButton).toBeInTheDocument();
      expect(nameRecipe0).toContainHTML('Corba');
      expect(nameRecipe1).toContainHTML('FloridaBushwacker');

      userEvent.click(favoriteButton);
      expect(nameRecipe0).toContainHTML('FloridaBushwacker');
    });

  test('verifica se os filtros e o botão de compartilhar', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const allButton = await screen.findByTestId('filter-by-all-btn');
    const foodButton = await screen.findByTestId('filter-by-food-btn');
    const drinkButton = await screen.findByTestId('filter-by-drink-btn');
    const nameRecipe0 = await screen.findByTestId('0-horizontal-name');
    const nameRecipe1 = await screen.findByTestId('1-horizontal-name');
    const shareRecipe = await screen.findByTestId('0-horizontal-share-btn');

    userEvent.click(foodButton);
    expect(nameRecipe0).toContainHTML('Corba');

    userEvent.click(drinkButton);
    expect(nameRecipe0).toContainHTML('FloridaBushwacker');

    userEvent.click(allButton);
    expect(nameRecipe0).toContainHTML('Corba');
    expect(nameRecipe1).toContainHTML('FloridaBushwacker');

    userEvent.click(nameRecipe0);
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toContainHTML('Corba');

    userEvent.click(shareRecipe);
    expect(await navigator.clipboard.readText()).toBe(linkCopied);
  });
});
