import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper';
import App from '../App';
import fetch from './mocks/fetch';

describe('Tela de Receitas Feitas', () => {
  const linkCopied = 'http://localhost:3000/foods/52771';
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
    window.navigator.clipboard = {
      readText: jest.fn(() => Promise.resolve(linkCopied)),
      writeText: jest.fn((text) => Promise.resolve(text)),
    };
    const doneRecipes = [
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'SpicyArrabiataPenne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  test('verifica se todos os componentes e data-testids estão presentes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const allButton = await screen.findByTestId('filter-by-all-btn');
    const foodButton = await screen.findByTestId('filter-by-food-btn');
    const drinkButton = await screen.findByTestId('filter-by-drink-btn');
    const imageRecipe = await screen.findByTestId('0-horizontal-image');
    const categoryRecipe = await screen.findByTestId('0-horizontal-top-text');
    const nameRecipe0 = await screen.findByTestId('0-horizontal-name');
    const nameRecipe1 = await screen.findByTestId('1-horizontal-name');
    const doneDate = await screen.findByTestId('1-horizontal-done-date');
    const shareRecipe0 = await screen.findByTestId('0-horizontal-share-btn');
    const shareRecipe1 = await screen.findByTestId('1-horizontal-share-btn');
    const tagName = await screen.findByTestId('0-Curry-horizontal-tag');
    const tagName1 = await screen.findByTestId('0-Pasta-horizontal-tag');

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(imageRecipe).toBeInTheDocument();
    expect(categoryRecipe).toBeInTheDocument();
    expect(doneDate).toBeInTheDocument();
    expect(shareRecipe0).toBeInTheDocument();
    expect(shareRecipe1).toBeInTheDocument();
    expect(tagName).toBeInTheDocument();
    expect(tagName1).toBeInTheDocument();
    expect(nameRecipe0).toBeInTheDocument('SpicyArrabiataPenne');
    expect(nameRecipe1).toBeInTheDocument('Aquamarine');
  });

  test('verifica o botão de compartilhar e se a URL é copiada para o clipboard',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/done-recipes');

      const allButton = await screen.findByTestId('filter-by-all-btn');
      const foodButton = await screen.findByTestId('filter-by-food-btn');
      const drinkButton = await screen.findByTestId('filter-by-drink-btn');
      const nameRecipe0 = await screen.findByTestId('0-horizontal-name');
      const shareRecipe0 = await screen.findByTestId('0-horizontal-share-btn');
      const nameRecipe1 = await screen.findByTestId('1-horizontal-name');

      userEvent.click(foodButton);
      expect(nameRecipe0).toHaveTextContent('SpicyArrabiataPenne');

      userEvent.click(drinkButton);
      expect(nameRecipe0).toContainHTML('Aquamarine');

      userEvent.click(allButton);
      expect(nameRecipe0).toContainHTML('SpicyArrabiataPenne');
      expect(nameRecipe1).toContainHTML('Aquamarine');

      userEvent.click(shareRecipe0);
      expect(await navigator.clipboard.readText()).toBe(linkCopied);
    });
});
