import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper';
import App from '../App';

describe('Tela de Receitas Feitas', () => {
  test('verifica se todos os data-testids estão presentes', async () => {
    renderWithRouter(<App />, '/done-recipes');
    const allButton = await findByTestId('filter-by-all-btn');
    const foodButton = await findByTestId('filter-by-food-btn');
    const drinkButton = await findByTestId('filter-by-drink-btn');
    const imageRecipe = await findByTestId('0-horizontal-image');
    const categoryRecipe = await findByTestId('0-horizontal-top-text');
    const nameRecipe = await findByTestId('1-horizontal-name');
    const doneDate = await findByTestId('1-horizontal-done-date');
    const shareRecipe = await findByTestId('1-horizontal-share-btn');
    const tagName = await findByTestId('1-horizontal-tag');

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(imageRecipe).toBeInTheDocument();
    expect(categoryRecipe).toBeInTheDocument();
    expect(nameRecipe).toBeInTheDocument();
    expect(doneDate).toBeInTheDocument();
    expect(shareRecipe).toBeInTheDocument();
    expect(tagName).toBeInTheDocument();
  });
  test('verifica o card possui os atributos corretos de uma comida', async () => {
    renderWithRouter(<App />, '/foods');
    const nameFood = await findByTestId('0-recipe-card');
    const favoriteButton = await findByTestId('favorite-btn');
    const profileFavorite = await findByTestId('profile-favorite-btn');
    const titleRecipe = await findByTestId('recipe-title');

    userEvent.click(nameFood);
    userEvent.click(favoriteButton);
    renderWithRouter(<App />, '/profile');
    userEvent.click(profileFavorite);

    expect(titleRecipe).getAllByRole('Turkish - Side');
  });

  test('verifica o card possui os atributos corretos de uma bebida', async () => {
    renderWithRouter(<App />, '/drinks');
    const nameDrink = await findByTestId('0-recipe-card');
    const favoriteButtonDrink = await findByTestId('favorite-btn');
    const profileFavorite = await findByTestId('profile-favorite-btn');
    const titleRecipe = await findByTestId('recipe-title');

    userEvent.click(nameDrink);
    userEvent.click(favoriteButtonDrink);
    renderWithRouter(<App />, '/profile');
    userEvent.click(profileFavorite);

    expect(titleRecipe).toBeInTheDocument('Optional alcohol');
  });
});
