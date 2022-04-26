import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <div className="App">
        TESTE
      </div>
    </AppProvider>
  );
}

export default App;
