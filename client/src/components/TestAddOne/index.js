import React, { useReducer } from 'react';
import Button from '@mui/material/Button';
import { reducer } from '../../state/store/reducers';
import ADD_TO_CART from '../../state/store/actions';

const testData = { id: 234421, quantity: 12 };

export default function TestAddOne(props) {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Button variant="contained" onClick={() => dispatch({ type: ADD_TO_CART, payload: testData })}>
      Contained
    </Button>
  );
}
