import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetch';

const foodInProgressRoute = '/foods/52977/in-progress';
const favoriteRecipes = '/favorite-recipes';

const linkCopied = 'http://localhost:3000/foods/52771';
beforeEach(() => {
  global.fetch = jest.fn(fetch);
  window.navigator.clipboard = {
    readText: jest.fn(() => Promise.resolve(linkCopied)),
    writeText: jest.fn((text) => Promise.resolve(text)),
  };
});

describe('Verifica a renderização dos elementos da página de progresso', () => {
  test(`Altera a rota para /foods/52977/in-progress
        e espera que os elementos sejam renderizados`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(foodInProgressRoute);
    const recipeImage = await screen.findByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toHaveTextContent('Corba');
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const favBtn = await screen.findByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toHaveTextContent('Side');
    const firstIngredient = await screen.findByTestId('0-ingredient-step');
    const lastIngredient = await screen.findByTestId('12-ingredient-step');
    expect(firstIngredient).toHaveTextContent('Lentils - 1 cup');
    expect(lastIngredient).toHaveTextContent('Sea Salt - Pinch');
    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toHaveTextContent('Pick through your lentils');
    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
  });
});

describe('Verifica o funcionamento do botão de compartilhar', () => {
  test(`Clica no botão de compartilhar e verifica 
      que o link seja copiado`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(foodInProgressRoute);
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    expect(await navigator.clipboard.readText()).toBe(linkCopied);
    const linkCopiedMsg = screen.getByText(/link copied/i);
    expect(linkCopiedMsg).toBeInTheDocument();
  });
});

describe('Verifica o funcionamento do botão de favoritar', () => {
  test(`Clica no botão de favoritar e verifica 
      que a receita foi favoritada`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(foodInProgressRoute);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn.src)
      .toContain('http://localhost/whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src)
      .toContain('http://localhost/blackHeartIcon.svg');
    history.push(favoriteRecipes);
    const foodTitle = await screen.findByText(/Corba/i);
    expect(foodTitle).toBeInTheDocument();
    history.push(foodInProgressRoute);
    userEvent.click(favoriteBtn);
    history.push(favoriteRecipes);
    expect(foodTitle).not.toBeInTheDocument();
  });
});

describe('Verifica o funcionamento do botão de finalizar receita', () => {
  test(`Clica no botão de finalizar receita e verifica 
      se o redirecionamento ocorre`, async () => {
    const { history } = renderWithRouter(<App />);
    // const { idMeal } = food.meals[0];
    history.push(foodInProgressRoute);
    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toHaveAttribute('disabled');
    const ingredientsOptions = await screen.findAllByRole('checkbox');
    for (let index = 0; index < ingredientsOptions.length; index += 1) {
      userEvent.click(ingredientsOptions[index]);
    }
    expect(finishRecipeBtn).not.toHaveAttribute('disabled');
    userEvent.click(finishRecipeBtn);
    const { location: { pathname } } = history;
    expect(pathname).toContain('/done-recipes');
  });
});

describe('Verifica os ingredientes utilizados salvos no LocalStorage', () => {
  test(`Clica eu ingrediente e verifica 
      se é registrado no LocalStorage`, async () => {
    const { history } = renderWithRouter(<App />);
    const { idMeal } = food.meals[0];
    history.push(foodInProgressRoute);
    const firstIngredient = await screen.findByLabelText('Lentils - 1 cup');
    userEvent.click(firstIngredient);
    const ingredInLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const numberOfIngredientsRemainig = 12;
    expect(ingredInLocalStorage.meals[idMeal]).toHaveLength(numberOfIngredientsRemainig);
  });
});
