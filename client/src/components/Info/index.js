import React from 'react';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { idbPromise } from '../../utils/helpers';

const Info = ({ item }) => {
  console.log(item);

  const [state, dispatch] = useStoreContext();

  const { _id, title, price, discountedPrice, stock } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    console.log(itemInCart);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };
  return (
    <div className="card px-1 py-1">
      <Typography variant="h5" gutterBottom component="div">
        {title}
      </Typography>
      <Divider />
      <div>
        <Typography variant="caption" display="block" gutterBottom>
          Currently {stock} in stock
        </Typography>
        <br></br>
        <Typography variant="caption" display="block" gutterBottom>
          {discountedPrice ? `£ ${discountedPrice}` : `£ ${price}`}
        </Typography>
        <br></br>
      </div>
      <Button variant="contained" onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default Info;
