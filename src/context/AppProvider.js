import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [stateA, setStateA] = useState('initialStateA');
  const [stateB, setStateB] = useState('initialStateB');
  const contextValue = { stateA, setStateA, stateB, setStateB };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
