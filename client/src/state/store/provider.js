import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;
{
  /* <StoreContext.Provider xxxxxx></StoreContext.Provider>; */
}

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    cart: [],
    cartOpen: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
