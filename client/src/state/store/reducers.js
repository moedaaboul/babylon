import { useReducer } from 'react';
import {
  // UPDATE_PRODUCTS,
  ADD_SINGLE_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

import { mergy } from '../../utils/helpers';

export const reducer = (state, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCTS:
    //   return {
    //     ...state,
    //     products: [...action.products],
    //   };

    case ADD_SINGLE_TO_CART:
      const mergyResult = mergy(state.cart, action.payload);

      return {
        ...state,
        cartOpen: true,
        cart: mergyResult,
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case UPDATE_CART_QUANTITY:
      // debugger;

      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action.payload.productId === product.productId && action.payload.productSize === product.productSize) {
            product.productAmount = action.payload.productAmount;
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
