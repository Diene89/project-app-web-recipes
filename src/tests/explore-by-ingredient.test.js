import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetch';
import mealIngredients from './mocks/mealIngredients';
import drinkIngredients from './mocks/drinkIngredients';
import chickenMeals from './mocks/chickenMeals';
import lightRumDrinks from './mocks/lightRumDrinks';

const exploreFoodsIngredientsRoute = 'explore/foods/ingredients';
const exploreDrinksIngredientsRoute = 'explore/drinks/ingredients';

const exploreIngredientsTitle = 'Explore Ingredients';

beforeEach(() => { global.fetch = jest.fn(fetch); });

describe('Deve existir uma página de explorar por ingredientes', () => {
  test(`Altera a rota para /explore/foods/ingredients 
        e espera pelo texto "Explore Ingredients"`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsIngredientsRoute);
    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent(exploreIngredientsTitle);
  });

  test(`Altera a rota para /explore/drinks/ingredients 
        e espera pelo texto "Explore Ingredients"`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinksIngredientsRoute);
    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent(exploreIngredientsTitle);
  });
});

describe(`Deve possuir 12 cards de ingredientes nas páginas
          de explorar comidas ou bebidas por ingredientes`, () => {
  test(`Na página de explorar comidas por ingredientes
        deve existir 12 cards de ingredientes`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsIngredientsRoute);

    await screen.findByText(exploreIngredientsTitle);

    const totalCards = 12;
    for (let index = 0; index < totalCards; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });

  test(`Na página de explorar bebidas por ingredientes
        deve existir 12 cards de ingredientes`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinksIngredientsRoute);

    await screen.findByText(exploreIngredientsTitle);

    const totalCards = 12;
    for (let index = 0; index < totalCards; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
});

describe('Os cards devem possuir nome e imagem correta', () => {
  test(`Na página de explorar comidas por ingredientes
        deve existir 12 cards com nome e imagem do ingrediente`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsIngredientsRoute);

    await screen.findByText(exploreIngredientsTitle);

    const totalCards = 12;
    for (let index = 0; index < totalCards; index += 1) {
      const { strIngredient } = mealIngredients.meals[index];
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`);
      expect(screen.getByTestId(`${index}-card-name`))
        .toHaveTextContent(strIngredient);
    }
  });

  test(`Na página de explorar bebidas por ingredientes
        deve existir 12 cards com nome e imagem do ingrediente`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinksIngredientsRoute);

    await screen.findByText(exploreIngredientsTitle);

    const totalCards = 12;
    for (let index = 0; index < totalCards; index += 1) {
      const { strIngredient1 } = drinkIngredients.drinks[index];
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`);
      expect(screen.getByTestId(`${index}-card-name`))
        .toHaveTextContent(strIngredient1);
    }
  });
});

describe(`Ao clicar em um ingrediente deve redirecionar para a página de comidas
          ou bebidas contendo apenas receitas com o ingrediente selecionado`, () => {
  test(`Ao clicar em um ingrediente de comida a página deve mudar para a
        tela principal de receitas de comida com o ingrediente selecionado`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsIngredientsRoute);

    await screen.findByText(exploreIngredientsTitle);

    userEvent.click(screen.getByTestId('0-ingredient-card'));

    await screen.findByText('Foods');

    const totalMeals = chickenMeals.meals.length;
    for (let index = 0; index < totalMeals; index += 1) {
      const { strMealThumb, strMeal } = chickenMeals.meals[index];
      expect(screen.getByTestId(`${index}-recipe-card`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', strMealThumb);
      expect(screen.getByTestId(`${index}-card-name`))
        .toHaveTextContent(strMeal);
    }
  });

  test(`Ao clicar em um ingrediente de bebida a página deve mudar para a
        tela principal de receitas de bebida com o ingrediente selecionado`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinksIngredientsRoute);

    await screen.findByText(exploreIngredientsTitle);

    userEvent.click(screen.getByTestId('0-ingredient-card'));

    await screen.findByText('Drinks');

    const totalDrinks = lightRumDrinks.drinks.length;
    for (let index = 0; index < totalDrinks; index += 1) {
      const { strDrinkThumb, strDrink } = lightRumDrinks.drinks[index];
      expect(screen.getByTestId(`${index}-recipe-card`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`))
        .toHaveAttribute('src', strDrinkThumb);
      expect(screen.getByTestId(`${index}-card-name`))
        .toHaveTextContent(strDrink);
    }
  });
});
