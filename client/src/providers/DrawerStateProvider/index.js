import React, { useContext } from 'react';

const AppContext = React.createContext();

const DrawerProvider = ({ children }) => {
  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <AppContext.Provider
      value={{
        drawerState,
        setDrawerState,
        toggleDrawer,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// here we are creating a custom hook
// use of the word use is required to be able to use the hook due to useContext
export const useDrawerContext = () => {
  return useContext(AppContext);
};

export { AppContext, DrawerProvider };
