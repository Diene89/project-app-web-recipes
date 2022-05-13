import React from 'react';
import { Link } from 'react-router-dom';
import async from '../images/async.svg';

function Async() {
  return (
    <section className="async-se-cozinha">
      <Link to="/login">
        <button
          type="button"
          src={ async }
        >
          <img src={ async } alt="drink-tag" />
        </button>
      </Link>
    </section>

  );
}

export default Async;
