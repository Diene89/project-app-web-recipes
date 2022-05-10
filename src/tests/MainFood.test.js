import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderPath';
import fetchMock from '../../cypress/mocks/fetch';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';

const allFilterUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const maxCategories = 5;
const categories = mealCategories.meals.map((cat) => cat.strCategory)
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
    expect(card).toHaveTextContent(recipe.strMeal);
    expect(img).toBeInTheDocument();
    expect(img).toHaveProperty('src', recipe.strMealThumb);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(recipe.strMeal);
  });
};

const filterTest = (category, firstCardName) => {
  const firstCard = screen.getByTestId('0-card-name');
  expect(firstCard).toHaveTextContent(firstCardName);
  if (category === 'onlyFirstCard') return;
  if (category === null) {
    expect(fetch).toHaveBeenCalledWith(allFilterUrl);
    return;
  }
  expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
};

describe.only('Testa componentes da tela de comidas principal', () => {
  const searchId = 'search-top-btn';
  const inputId = 'search-input';
  const radioId = /search-radio/;
  const exec = 'exec-search-btn';

  it('Testa se clicar no botão de pesquisa funciona', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
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
    history.push('/foods');
    const toggle = screen.getByTestId(searchId);
    userEvent.click(toggle);
    const radios = screen.getAllByTestId(radioId);
    const input = screen.getByTestId(inputId);
    userEvent.type(input, 'Chicken');
    expect(input).toHaveValue('Chicken');
    radios.forEach((radio) => {
      userEvent.click(radio);
      expect(radio).toBeChecked();
    });
  });

  it('Testa se buscar com mais de um caracter gera um alert', () => {
    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
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
    history.push('/foods');
    await screen.findByTestId('0-recipe-card');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(allFilterUrl);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  });

  it('Testa se os cards estão presentes e com as dados corretos', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
    });
    const firstElement = screen.getByTestId(secondCard);
    expect(firstElement).toHaveTextContent(meals.meals[1].strMeal);
    cardChecker(meals.meals);
  });

  it('Verifica se todos os filtros estão presentes', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
    });
    categories.forEach((cat) => {
      const categorieBtn = screen.getByTestId(`${cat}-category-filter`);
      expect(categorieBtn).toBeInTheDocument();
      expect(categorieBtn).toHaveTextContent(cat);
    });
  });

  it('Teste - Clicar no botão de filtro o conteudo da pagina muda', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const memory = (await screen.findByTestId(secondCard)).innerHTML;
    const testButton = await screen.findByTestId('Beef-category-filter');
    userEvent.click(testButton);
    const newMemory = (await screen.findByTestId(secondCard)).innerHTML;
    expect(memory).not.toBe(newMemory);
    const memory2 = (await screen.findByTestId(secondCard)).innerHTML;
    const testButton2 = await screen.findByTestId('All-category-filter');
    userEvent.click(testButton2);
    const newMemory2 = (await screen.findByTestId(secondCard)).innerHTML;
    console.log(memory2, newMemory2);
    expect(memory2).not.toBe(newMemory2);
  });

  it('Verifica se ao clicar novamente no mesmo filtro os cards retornam ao inicial',
    async () => {
      await act(async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/foods');
      });
      const categoryTest = await screen.findByTestId('Beef-category-filter');
      await act(async () => userEvent.click(categoryTest));
      filterTest('Beef', 'Beef and Mustard Pie');
      await act(async () => userEvent.click(categoryTest));
      filterTest('onlyFirstCard', 'Corba');
    });

  it('Testa se clicar no card da receita redireciona o usuário', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const memory = (await screen.findByTestId('0-recipe-card'));
      userEvent.click(memory);
      const id = await meals.meals[0].idMeal;
      expect(history.location.pathname).toBe(`/foods/${id}`);
    });
  });
});
