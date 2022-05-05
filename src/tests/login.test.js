import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderPath';

describe('Testa os componente da tela de Login', () => {
  const imail = 'claudio';
  const email = 'teste@teste.com';
  const zenha = 'abc';
  const senha = 'teste123';
  it('Tenta digitar nos inputs de email, password e o botão permanece inativo', () => {
    const { history } = renderPath(<App />);
    history.push('/');
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, imail);
    userEvent.type(inputPassword, zenha);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputEmail).toHaveValue(imail);
    expect(submitButton).toBeDisabled();
  });
  it('Redireciona para a tela de comida se os dados forem válidos', () => {
    const { history } = renderWithRouter(<App />);
    // history.push('/');
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, senha);
    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);
    // history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
  });
});
