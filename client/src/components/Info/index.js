import React from 'react';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';
// import Divider from '@mui/material/Divider';
// import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import { idbPromise, randomBrand } from '../../utils/helpers';

import './index.css';
import { TableCell } from '@mui/material';

const displayDiscountPrice = (discountPrice, price) => {
  return (
    <>
      <div className="original-price">£{price}.00</div>
      <Typography variant="h6" display="block" gutterBottom sx={{ margin: '0px', fontWeight: 'light' }}>
        £{discountPrice}.00
      </Typography>
    </>
  );
};
const displayNormalPrice = (price) => {
  return (
    <>
      <Typography variant="h6" display="block" gutterBottom sx={{ margin: '0px', fontWeight: 'light' }}>
        £{price}.00
      </Typography>
    </>
  );
};

const Info = ({ item }) => {
  // console.log(item);

  const [state, dispatch] = useStoreContext();

  const { _id, title, price, discountedPrice, stock } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    console.log(itemInCart);
    if (itemInCart) {
      let newQuantity = itemInCart.purchaseQuantity + 1;
      newQuantity > itemInCart.stock ? (newQuantity = itemInCart.stock) : (newQuantity = newQuantity);

      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: itemInCart._id,
        purchaseQuantity: parseInt(newQuantity),
      });

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(newQuantity),
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
      <Typography variant="h4" gutterBottom component="div" sx={{ margin: '0px', fontWeight: 'light' }}>
        {randomBrand()}
      </Typography>
      <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 'bolder' }}>
        {title}
      </Typography>
      <div>
        <Typography variant="caption" display="block" gutterBottom sx={{ fontWeight: 'light', color: 'darkGrey' }}>
          Currently {stock} in stock
        </Typography>
        <br></br>
        <Stack direction="row" spacing={2}>
          {discountedPrice < price ? displayDiscountPrice(discountedPrice, price) : displayNormalPrice(price)}
        </Stack>
        <br></br>
        <Box sx={{ width: '100%', marginBottom: '50px' }}>
          <Stack spacing={0}>
            <TableCell sx={{ border: 'solid 1px lightGrey', borderBottom: 'none' }}>
              <Grid container spacing={0}>
                <Grid item xs={10}>
                  <Stack spacing={0}>
                    <Box>
                      <LocalShippingIcon />
                    </Box>
                    <Box>
                      <Typography sx={{ margin: '0px', fontWeight: 'bolder' }}>2-4 working days</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ margin: '0px', fontWeight: 'light' }}>Standard delivery</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography sx={{ margin: '0px', fontWeight: 'bolder' }}>Free</Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell sx={{ border: 'solid 1px lightGrey', borderBottom: 'none' }}>
              <Inventory2Icon />
              <Typography sx={{ margin: '0px', fontWeight: 'bolder' }}>Free delivery and free returns</Typography>
            </TableCell>
            <TableCell sx={{ border: 'solid 1px lightGrey' }}>
              <KeyboardReturnIcon />
              <Typography sx={{ margin: '0px', fontWeight: 'bolder' }}>100 day return policy</Typography>
            </TableCell>
          </Stack>
        </Box>
      </div>
      <Button
        // className={useStyles.blackButton}
        type="submit"
        fullWidth
        variant="contained"
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
          lineHeight: 2.75,
        }}
        onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default Info;
