import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper';
import App from '../App';

describe('Tela de Receitas Feitas', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
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

  test('verifica se todos os data-testids estão presentes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const allButton = await screen.findByTestId('filter-by-all-btn');
    const foodButton = await screen.findByTestId('filter-by-food-btn');
    const drinkButton = await screen.findByTestId('filter-by-drink-btn');
    const imageRecipe = await screen.findByTestId('0-horizontal-image');
    const categoryRecipe = await screen.findByTestId('0-horizontal-top-text');
    const nameRecipe = await screen.findByTestId('1-horizontal-name');
    const doneDate = await screen.findByTestId('1-horizontal-done-date');
    const shareRecipe = await screen.findByTestId('1-horizontal-share-btn');
    const tagName = await screen.findByTestId('0-Curry-horizontal-tag');
    const tagName1 = await screen.findByTestId('0-Pasta-horizontal-tag');

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(imageRecipe).toBeInTheDocument();
    expect(categoryRecipe).toBeInTheDocument();
    expect(nameRecipe).toBeInTheDocument();
    expect(doneDate).toBeInTheDocument();
    expect(shareRecipe).toBeInTheDocument();
    expect(tagName).toBeInTheDocument();
    expect(tagName1).toBeInTheDocument();
  });
  test('verifica o card possui os atributos corretos de uma comida', async () => {
    renderWithRouter(<App />, '/foods');
    const nameFood = await screen.findByTestId('0-recipe-card');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const profileFavorite = await screen.findByTestId('profile-favorite-btn');
    const titleRecipe = await screen.findByTestId('recipe-title');

    userEvent.click(nameFood);
    userEvent.click(favoriteButton);
    renderWithRouter(<App />, '/profile');
    userEvent.click(profileFavorite);

    expect(titleRecipe).getAllByRole('Turkish - Side');
  });

  test('verifica o card possui os atributos corretos de uma bebida', async () => {
    renderWithRouter(<App />, '/drinks');
    const nameDrink = await screen.findByTestId('0-recipe-card');
    const favoriteButtonDrink = await screen.findByTestId('favorite-btn');
    const profileFavorite = await screen.findByTestId('profile-favorite-btn');
    const titleRecipe = await screen.findByTestId('recipe-title');

    userEvent.click(nameDrink);
    userEvent.click(favoriteButtonDrink);
    renderWithRouter(<App />, '/profile');
    userEvent.click(profileFavorite);

    expect(titleRecipe).toBeInTheDocument('Optional alcohol');
  });
});
