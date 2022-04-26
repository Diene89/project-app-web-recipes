import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import MainFood from './pages/MainFood';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route exact path="/food" component={ MainFood } />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
