import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Routes from './components/Routes';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>        
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
