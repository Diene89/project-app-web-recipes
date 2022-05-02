import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <main>
      <Header title="Explore" showSearchIcon={ false } />
      <button type="button" name="Explore Foods" data-testid="explore-foods">
        Explore Foods
      </button>
      <button type="button" name="Explore Drinks" data-testid="explore-drinks">
        Explore Drinks
      </button>
      <Footer />
      Explore
    </main>
  );
}

export default Explore;
