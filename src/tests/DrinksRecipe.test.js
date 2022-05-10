import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderPath';
import fetchMock from '../../cypress/mocks/fetch';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import Drinks from '../../cypress/mocks/drinks';

const allFilterUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const maxCategories = 5;
const categories = drinkCategories.drinks.map((cat) => cat.strCategory)
  .slice(0, maxCategories)
  .concat('All');
const secondCard = '1-card-name';

const cardChecker = (recipes) => {
  const maxCards = 12;
  recipes.slice(0, maxCards).forEach((recipe, index) => {
    const card = screen.getByTestId(`${index}-recipe-card`);
    const img = screen.getByTestId(`${index}-card-img`);
    const name = screen.getByTestId(`${index}-card-name`);
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent(recipe.strDrink);
    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', recipe.strDrinkThumb);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(recipe.strDrink);
  });
};

const filterTest = (category, secondCardName) => {
  const firstCard = screen.getByTestId('0-card-name');
  expect(firstCard).toHaveTextContent(secondCardName);
  if (category === 'onlyFirstCard') return;
  if (category === null) {
    expect(fetch).toHaveBeenCalledWith(allFilterUrl);
    return;
  }
  expect(fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
};

describe.only('Testa componentes da tela de comidas principal', () => {
  const searchId = 'search-top-btn';
  const inputId = 'search-input';
  const radioId = /search-radio/;
  const exec = 'exec-search-btn';

  it('Testa se clicar no botão de pesquisa funciona', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const toggle = screen.getByTestId(searchId);
    userEvent.click(toggle);
    const radios = screen.getAllByTestId(radioId);
    const input = screen.getByTestId(inputId);
    const search = screen.getByTestId(exec);
    expect(input).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    radios.forEach((radio) => expect(radio).toBeInTheDocument());
  });

  it('Testa se escrever no input interfere em clicar nos radios', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const toggle = screen.getByTestId(searchId);
    userEvent.click(toggle);
    const radios = screen.getAllByTestId(radioId);
    const input = screen.getByTestId(inputId);
    userEvent.type(input, 'B-52');
    expect(input).toHaveValue('B-52');
    radios.forEach((radio) => {
      userEvent.click(radio);
      expect(radio).toBeChecked();
    });
  });

  it('Testa se buscar com mais de um caracter gera um alert', () => {
    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const toggle = screen.getByTestId(searchId);
    userEvent.click(toggle);
    const input = screen.getByTestId(inputId);
    const radios = screen.getAllByTestId(radioId);
    const searchBtn = screen.getByTestId(exec);
    userEvent.type(input, 'AB');
    userEvent.click(radios[2]);
    userEvent.click(searchBtn);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  beforeEach(() => {
    global.fetch = jest.fn(fetchMock);
  });

  it('Verifica se os endpoints corretos são utilizados', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await screen.findByTestId('0-recipe-card');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(allFilterUrl);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });

  it('Testa se os cards estão presentes e com as dados corretos', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
    });
    const firstElement = screen.getByTestId(secondCard);
    expect(firstElement).toHaveTextContent(Drinks.drinks[1].strDrink);
    cardChecker(Drinks.drinks);
  });

  it('Verifica se todos os filtros estão presentes', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
    });
    categories.forEach((cat) => {
      const categorieBtn = screen.getByTestId(`${cat}-category-filter`);

      expect(categorieBtn).toBeInTheDocument();
      expect(categorieBtn).toHaveTextContent(cat);
    });
  });

  it('Teste - Clicar no botão de filtro o conteudo da pagina muda', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const memory = (await screen.findByTestId(secondCard)).innerHTML;
    const testButton = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(testButton);
    const newMemory = (await screen.findByTestId(secondCard)).innerHTML;
    expect(memory).not.toBe(newMemory);
    const memory2 = (await screen.findByTestId(secondCard)).innerHTML;
    const testButton2 = await screen.findByTestId('All-category-filter');
    userEvent.click(testButton2);
    const newMemory2 = (await screen.findByTestId(secondCard)).innerHTML;
    expect(memory2).not.toBe(newMemory2);
  });

  it('Verifica se ao clicar novamente no mesmo filtro os cards retornam ao inicial',
    async () => {
      await act(async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/drinks');
      });
      const categoryTest = await screen.findByTestId('Cocktail-category-filter');
      await act(async () => userEvent.click(categoryTest));
      filterTest('Cocktail', '57 Chevy with a White License Plate');
      await act(async () => userEvent.click(categoryTest));
      filterTest('onlyFirstCard', 'GG');
    });

  it('Testa se clicar no card da receita redireciona o usuário', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
      const memory = (await screen.findByTestId('0-recipe-card'));
      userEvent.click(memory);
      const id = await Drinks.drinks[0].idDrink;
      expect(history.location.pathname).toBe(`/drinks/${id}`);
    });
  });
});
