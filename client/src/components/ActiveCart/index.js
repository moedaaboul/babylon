import React from 'react';
import TableBody from '@mui/material/TableBody';
import CartItem from '../SingleCartItem';
import { Button } from '@mui/material';
import Auth from '../../utils/auth';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../providers/DrawerStateProvider';

import './index.css';

export default function ActiveCart({ cart, total }) {
  const { setDrawerState } = useDrawerContext();
  let navigate = useNavigate();

  console.log('From ActiveCart', cart);
  return (
    <>
      <TableBody>
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </TableBody>

      <br></br>

      <Typography className="total-figure">Total: £ {total}</Typography>

      <br></br>
      {Auth.loggedIn() ? (
        <Button
          className="check-out-button"
          variant="contained"
          onClick={() => {
            // dispatch({ type: TOGGLE_CART });
            setDrawerState({
              bottom: false,
              right: false,
            });
            navigate('/checkout');
          }}>
          Checkout
        </Button>
      ) : (
        <Typography variant="caption" display="block" gutterBottom>
          Please log in to check out
        </Typography>
      )}
    </>
  );
}
