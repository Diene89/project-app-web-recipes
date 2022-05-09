import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetch';

const detailsDrinksRoute = '/drinks/15997';
const favoriteRecipes = '/favorite-recipes';

const linkCopied = 'http://localhost:3000/drinks/15997';
beforeEach(() => {
  global.fetch = jest.fn(fetch);
  window.navigator.clipboard = {
    readText: jest.fn(() => Promise.resolve(linkCopied)),
    writeText: jest.fn((text) => Promise.resolve(text)),
  };
});

describe('Verifica a renderização dos elementos da página de detalhes', () => {
  test(`Altera a rota para /foods/15997 
        e espera que os elementos sejam renderizados`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(detailsDrinksRoute);
    const recipeImage = await screen.findByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toHaveTextContent('GG');
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const favBtn = await screen.findByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toHaveTextContent('Optional alcohol');
    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(firstIngredient).toHaveTextContent('Galliano - 2 1/2 shots');
    const lastIngredient = await screen.findByTestId('2-ingredient-name-and-measure');
    expect(lastIngredient).toHaveTextContent('Icenull');
    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toHaveTextContent('Pour the Galliano liqueur');
    const firstRecomendationCard = await screen.findByTestId('0-recomendation-card');
    expect(firstRecomendationCard).toBeInTheDocument();
    const firstRecomendationImage = await screen.findByAltText('Corba');
    expect(firstRecomendationImage).toBeInTheDocument();
    const firstRecomendationTitle = await screen.findByTestId('0-recomendation-title');
    expect(firstRecomendationTitle).toHaveTextContent('Corba');
    const secondRecomendationCard = await screen.findByTestId('1-recomendation-card');
    expect(secondRecomendationCard).toBeInTheDocument();
    const secondRecomendationImage = await screen.findByAltText('Burek');
    expect(secondRecomendationImage).toBeInTheDocument();
    const secondRecomendationTitle = await screen.findByTestId('1-recomendation-title');
    expect(secondRecomendationTitle).toHaveTextContent('Burek');
    const typeOfDrinkRecomended = await screen.findAllByRole('heading');
    expect(typeOfDrinkRecomended[4]).toHaveTextContent('Side');
    expect(typeOfDrinkRecomended[6]).toHaveTextContent('Side');
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
  });
});

describe('Verifica o funcionamento do botão de compartilhar', () => {
  test(`Clica no botão de compartilhar e verifica 
      que o link seja copiado`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(detailsDrinksRoute);
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
    history.push(detailsDrinksRoute);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn.src)
      .toContain('http://localhost/whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src)
      .toContain('http://localhost/blackHeartIcon.svg');
    history.push(favoriteRecipes);
    const foodTitle = await screen.findByText(/GG/i);
    expect(foodTitle).toBeInTheDocument();
    history.push(detailsDrinksRoute);
    userEvent.click(favoriteBtn);
    history.push(favoriteRecipes);
    expect(foodTitle).not.toBeInTheDocument();
  });
});
