import React from 'react';
import { PropTypes } from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  const user = localStorage.getItem('user');
  const email = !user ? '' : JSON.parse(user).email;
  const { history } = props;
  return (
    <>
      <h2>Profile</h2>
      <Header title="Profile" showSearchIcon={ false } />
      <section>
        <p data-testid="profile-email">{email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.node.isRequired,
};

export default Profile;
