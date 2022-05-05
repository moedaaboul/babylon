import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const BadgesProvider = ({ children }) => {
  const [wishListCount, setWishListCount] = useState(0);

  return (
    <AppContext.Provider
      value={{
        wishListCount,
        setWishListCount,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// here we are creating a custom hook
// use of the word use is required to be able to use the hook due to useContext
export const useBadgeContext = () => {
  return useContext(AppContext);
};

export { AppContext, BadgesProvider };
