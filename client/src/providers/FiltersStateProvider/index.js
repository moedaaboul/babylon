import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const FiltersProvider = ({ children }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [categories, setCategories] = useState(null);

  return (
    <AppContext.Provider
      value={{
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        categories,
        setCategories,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// here we are creating a custom hook
// use of the word use is required to be able to use the hook due to useContext
export const useFilterContext = () => {
  return useContext(AppContext);
};

export { AppContext, FiltersProvider };
