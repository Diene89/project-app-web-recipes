import React from 'react';
import { PropTypes } from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/Profile.css';

function Profile(props) {
  const user = localStorage.getItem('user');
  const email = !user ? '' : JSON.parse(user).email;
  const { history } = props;
  return (
    <main className="Profile">
      <Header title="Profile" showSearchIcon={ false } />
      <p data-testid="profile-email" className="profile-email">{email}</p>
      <section className="redirect-buttons">
        <button
          type="button"
          className="profile-done-btn"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="profile-done-btn"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          className="profile-done-btn"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout
        </button>
      </section>
      <Footer />
    </main>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Profile;
