import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const SortProvider = ({ children }) => {
  const [lowHigh, setLowHigh] = useState(false);
  const [highLow, setHighLow] = useState(false);

  return (
    <AppContext.Provider
      value={{
        lowHigh,
        setLowHigh,
        highLow,
        setHighLow,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// here we are creating a custom hook
// use of the word use is required to be able to use the hook due to useContext
export const useSortContext = () => {
  return useContext(AppContext);
};

export { AppContext, SortProvider };
