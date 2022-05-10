import React from 'react';
import TableBody from '@mui/material/TableBody';
import CartItem from '../SingleCartItem';
import Button from '@mui/material/Button';
import Auth from '../../utils/auth';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext } from '../../providers/DrawerStateProvider';

import './index.css';

export default function ActiveCart({ cart, total }) {
  const { setDrawerState } = useDrawerContext();
  let navigate = useNavigate();

  return (
    <>
      <TableBody>
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </TableBody>

      <br></br>

      <Typography className="total-figure" style={{ marginLeft: '10px' }}>
        Total: £ {total}
      </Typography>

      <br></br>
      {Auth.loggedIn() ? (
        <Button
          className="check-out-button"
          variant="contained"
          disableRipple
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderRadius: 0,
            fontWeight: 'bold',
            letterSpacing: '2px',
            '&:hover': {
              backgroundColor: '#66676e',
              color: '#fff',
            },
            lineHeight: 1.75,
          }}
          style={{ marginLeft: '10px' }}
          onClick={() => {
            // dispatch({ type: TOGGLE_CART });
            setDrawerState({
              bottom: false,
              right: false,
            });
            navigate('/checkout');
          }}>
          Go to Checkout
        </Button>
      ) : (
        <Typography variant="caption" display="block" gutterBottom>
          Please log in to check out
        </Typography>
      )}
    </>
  );
}
