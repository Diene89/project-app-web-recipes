import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetch';
import meal from './mocks/meal';
import drink from './mocks/drink';

const exploreFoodsRoute = 'explore/foods';
const exploreDrinksRoute = 'explore/drinks';

beforeEach(() => { global.fetch = jest.fn(fetch); });

describe('Verifica se é possível ir até a tela de explorar comidas', () => {
  test(`Altera a rota para /explore/foods 
        e espera pelo texto Explore Foods`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsRoute);
    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Explore Foods');
  });
});

describe('Testa a tela de explorar comidas', () => {
  test('Verifica se os botões de redirecionar existem', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsRoute);

    expect(await screen.findByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(await screen.findByTestId('explore-by-nationality')).toBeInTheDocument();
    expect(await screen.findByTestId('explore-surprise')).toBeInTheDocument();
  });
});

describe('Testa os botões de redirecionar da tela de explorar comidas', () => {
  test(`Ao clicar no botão "By Ingredient" a rota
        deve mudar para /explore/foods/ingredients`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsRoute);

    const byIngredientBtn = await screen.findByRole('button', { name: 'By Ingredient' });
    userEvent.click(byIngredientBtn);

    await screen.findByText('Explore Ingredients');

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/ingredients');
  });

  test(`Ao clicar no botão "By Nationality" a rota
        deve mudar para /explore/foods/nationalities`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsRoute);

    const byNationalityBtn = await screen
      .findByRole('button', { name: 'By Nationality' });
    userEvent.click(byNationalityBtn);

    await screen.findByText('Explore Nationalities');

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/nationalities');
  });

  test(`Ao clicar no botão "Surprise me!" a rota
        deve mudar para /explore/foods/\${ID}
        sendo \${ID} o id de uma comida aleatória`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoodsRoute);

    const surpriseMeBtn = await screen.findByRole('button', { name: 'Surprise me!' });
    userEvent.click(surpriseMeBtn);

    await screen.findByText('Ingredients');

    const { idMeal } = meal.meals[0];
    const { location: { pathname } } = history;
    expect(pathname).toContain(`/foods/${idMeal}`);
  });
});

describe('Testa os botões de redirecionar da tela de explorar bebidas', () => {
  test(`Ao clicar no botão "By Ingredient" a rota
        deve mudar para /explore/drinks/ingredients`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinksRoute);

    const byIngredientBtn = await screen.findByRole('button', { name: 'By Ingredient' });
    userEvent.click(byIngredientBtn);

    await screen.findByText('Explore Ingredients');

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });

  test(`Ao clicar no botão "Surprise me!" a rota
        deve mudar para /explore/drinks/\${ID}
        sendo \${ID} o id de uma bebida aleatória`, async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreDrinksRoute);

    const surpriseMeBtn = await screen.findByRole('button', { name: 'Surprise me!' });
    userEvent.click(surpriseMeBtn);

    await screen.findByText('Ingredients');

    const { idDrink } = drink.drinks[0];
    const { location: { pathname } } = history;
    expect(pathname).toContain(`/drinks/${idDrink}`);
  });
});
