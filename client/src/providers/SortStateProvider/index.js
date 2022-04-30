import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const SortProvider = ({ children }) => {
  const [priceAsc, setPriceAsc] = useState(false);
  const [priceDesc, setPriceDesc] = useState(false);
  const [sortNewest, setSortNewest] = useState(false);

  return (
    <AppContext.Provider
      value={{
        priceAsc,
        setPriceAsc,
        priceDesc,
        setPriceDesc,
        sortNewest,
        setSortNewest,
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
