import React from 'react';

function Login() {
  return (
    <main>
      <h2>Login</h2>
      <form>
        <input data-testid="email-input" placeholder="Email" />
        <input data-testid="password-input" placeholder="Password" />
        <button data-testid="login-submit-btn" type="submit">
          Enter
        </button>
      </form>
    </main>
  );
}

export default Login;
