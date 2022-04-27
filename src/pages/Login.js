import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonValidation = () => {
    const val = /\S+@\S+\.\S+/;
    const validationEmail = val.test(email);
    const seis = 6;
    return !(validationEmail && password.length > seis);
  };

  const emailUser = 'email';
  const handleSubmit = () => {
    const { history } = props;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ [emailUser]: email }));
    history.push('/foods');
  };

  return (
    <main>
      <h2>Login</h2>
      <form>
        <input
          data-testid="email-input"
          placeholder="Email"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          data-testid="password-input"
          placeholder="Password"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ buttonValidation() }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </form>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.node.isRequired,
};

export default Login;
