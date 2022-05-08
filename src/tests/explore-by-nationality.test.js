import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetch';
import meals from './mocks/meals';
import areas from './mocks/areas';
import americanMeals from './mocks/americanMeals';
import turkishMeals from './mocks/turkishMeals';
import mealMock from './mocks/meal';

const exploreFoodsNationalityRoute = 'explore/foods/nationalities';
const exploreDrinksNationalityRoute = 'explore/drinks/nationalities';

const exploreNationalityTitle = 'Explore Nationalities';

beforeEach(() => { global.fetch = jest.fn(fetch); });

const checkMeals = async ({ meals: mealsArray }) => {
  expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
  mealsArray.forEach((meal, index) => {
    expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();

    const cardImage = screen.getByTestId(`${index}-card-img`);
    const cardName = screen.getByTestId(`${index}-card-name`);
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();

    expect(cardImage).toHaveAttribute('src', meal.strMealThumb);
    expect(cardName).toHaveTextContent(meal.strMeal);
  });
};

describe(`Deve existir uma página de explorar receitas por nacionalidade
          apenas para comida`, () => {
  test(`Altera a rota para /explore/foods/nationalities 
        e espera pelo texto "Explore Nationalities"`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsNationalityRoute);
    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent(exploreNationalityTitle);
  });

  test(`Altera a rota para /explore/drinks/nationalities
        e espera pelo texto "Not Found"`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinksNationalityRoute);
    const notFound = await screen.findByText('Not Found');
    expect(notFound).toBeInTheDocument();
  });
});

describe(`A página de explorar por nacionalidades deve mostrar
          cards de todas as nacionalidades ao ser carregada`, () => {
  test('Verifica se existe cards de receitas de todas as nacionalidades', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsNationalityRoute);

    await screen.findByText(exploreNationalityTitle);

    await checkMeals(meals);
  });

  test(`Ao clicar em um card de uma receita, a página deve mudar para
        detalhes da receita com a URL contendo o ID da mesma`,
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsNationalityRoute);

    await screen.findByText(exploreNationalityTitle);

    userEvent.click(screen.getByTestId('0-recipe-card'));

    await screen.findByText('Ingredients');

    const { idMeal } = mealMock.meals[0];
    const { location: { pathname } } = history;
    expect(pathname).toContain(`/foods/${idMeal}`);
  });
});

describe('Verifica o select da página de explorar por nacionalidades', () => {
  test('O select deve ter todas as áreas retornadas pela API incluindo All', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsNationalityRoute);

    await screen.findByText(exploreNationalityTitle);

    const select = screen.getByTestId('explore-by-nationality-dropdown');
    expect(select).toBeInTheDocument();

    expect(screen.getByTestId('All-option')).toHaveTextContent('All');
    areas.meals.forEach(({ strArea }) => {
      expect(screen.getByTestId(`${strArea}-option`)).toHaveTextContent(strArea);
    });
  });

  test(`Ao selecionar uma option no select as receitas devem
        ser filtradas de acordo com a option selecionada`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsNationalityRoute);

    await screen.findByText(exploreNationalityTitle);
    const select = screen.getByTestId('explore-by-nationality-dropdown');

    userEvent.selectOptions(select, 'American');
    await checkMeals(americanMeals);
    userEvent.selectOptions(select, 'Turkish');
    await checkMeals(turkishMeals);
    userEvent.selectOptions(select, 'All');
    await checkMeals(meals);
  });
});
