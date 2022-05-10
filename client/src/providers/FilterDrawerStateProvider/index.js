import React, { useContext } from 'react';

const AppContext = React.createContext();

const FilterDrawerProvider = ({ children }) => {
  const [filterDrawerState, setFilterDrawerState] = React.useState({
    left: false,
  });

  const toggleFilterDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setFilterDrawerState({ ...filterDrawerState, [anchor]: open });
  };

  return (
    <AppContext.Provider
      value={{
        filterDrawerState,
        setFilterDrawerState,
        toggleFilterDrawer,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// here we are creating a custom hook
// use of the word use is required to be able to use the hook due to useContext
export const useFilterDrawerContext = () => {
  return useContext(AppContext);
};

export { AppContext, FilterDrawerProvider };
