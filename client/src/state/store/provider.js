import React, { createContext, useContext, useReducer } from 'react';
import { storeReducer } from './reducers';

// create a react context component
const StoreContext = createContext();

// initial object schema for the store
const initialStoreState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
};

// Initialising context wrapper for the app.
export const StoreProvider = (props) => {
  // Reducer hook which gives back our store state and the dispatch function to affect it
  const [state, dispatch] = useReducer(storeReducer, initialStoreState);

  // giving data to children elements via the provider value

  // value is the reducer's state and the dispatch with a readable name
  return <StoreContext.Provider value={{ storeState: state, storeDispatch: dispatch }} {...props} />;
};

// Getting the store context provider value
export const useStoreContext = () => useContext(StoreContext);
