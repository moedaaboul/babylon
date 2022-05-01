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

import { updateSummary, mergy } from '../../utils/helpers';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_SINGLE_TO_CART:
      const mergyResult = mergy(state.cart, action.payload);
      let updateState = { ...state, cartOpen: true, cart: mergyResult };
      return updateSummary(updateState);

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case UPDATE_CART_QUANTITY:
      const updateAmount = {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action.payload.productId === product.productId && action.payload.productSize === product.productSize) {
            product.productAmount = action.payload.productAmount;
          }
          return product;
        }),
      };

      return updateSummary(updateAmount);

    case REMOVE_FROM_CART:
      const newCart = state.cart.filter((product) => {
        const condition_id_match = product.productId === action.payload.productId;
        const condition_size_match = product.productSize === action.payload.productSize;
        const condition_combination = !(condition_id_match && condition_size_match);
        return condition_combination;
      });

      const newState = {
        ...state,
        cartOpen: newCart.length > 0,
        cart: newCart,
      };

      return updateSummary(newState);

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
        summary: 0,
        saving: 0,
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
