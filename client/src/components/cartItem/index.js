import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import './cart.css';

import { getSingleItemById } from '../../utils/helpers';
import { useStoreContext } from '../../state/store/provider';

import { UPDATE_CART_QUANTITY, REMOVE_FROM_CART } from '../../state/store/actions';

export default function CartItem({ idInCart }) {
  const [state, dispatch] = useStoreContext();

  console.log(state.cart[idInCart]);

  const handleAdd = (e) => {
    e.preventDefault();
    const thisItemQuantity = state.cart[idInCart].productAmount;
    const addOne = thisItemQuantity + 1;
    dispatch({
      type: UPDATE_CART_QUANTITY,
      payload: {
        productId: state.cart[idInCart].productId,
        productSize: state.cart[idInCart].productSize,
        productAmount: addOne,
      },
    });
  };
  const handleMinus = (e) => {
    e.preventDefault();
    const thisItemQuantity = state.cart[idInCart].productAmount;
    const minusOne = thisItemQuantity - 1;
    if (minusOne !== 0) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        payload: {
          productId: state.cart[idInCart].productId,
          productSize: state.cart[idInCart].productSize,
          productAmount: minusOne,
        },
      });
    } else {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: { productId: state.cart[idInCart].productId },
      });
    }
  };
  const handleRemove = (e) => {
    e.preventDefault();
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { productId: state.cart[idInCart].productId },
    });
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        className="image"
        component="img"
        sx={{ width: 150, height: 150 }}
        image={
          'https://www.coindesk.com/resizer/QbDjo7Itdo_s_mY0nezYcLsCsak=/1200x600/center/top/cloudfront-us-east-1.images.arcpublishing.com/coindesk/UVSE46JF7NAQDFCOPZBCODGPHE.jpg'
        }
        alt="Live from space album cover"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            Test
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton color="primary" aria-label="addOne" component="span" onClick={handleAdd}>
            <AddIcon sx={{ height: 20, width: 20 }} />
          </IconButton>

          <Typography variant="div" component="div">
            {state.cart[idInCart].productAmount}
          </Typography>

          <IconButton color="primary" aria-label="minusOne" component="span" onClick={handleMinus}>
            <RemoveIcon sx={{ height: 20, width: 20 }} />
          </IconButton>

          <IconButton color="primary" aria-label="remove" component="span" onClick={handleRemove}>
            <RemoveCircleOutlineIcon sx={{ height: 20, width: 20 }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
