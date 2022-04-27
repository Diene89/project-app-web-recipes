import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonValidation = () => {
    const val = /\S+@\S+\.\S+/;
    const validationEmail = val.test(email);
    const seis = 6;
    return !(validationEmail && password.length > seis);
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
          type="submit"
          disabled={ buttonValidation() }
        >
          Enter
        </button>
      </form>
    </main>
  );
}

export default Login;
