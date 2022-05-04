import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';

import { Box, Divider, Grid, Typography, Button } from '@mui/material';
import { idbPromise } from '../../utils/helpers';

const Info = ({ item }) => {
  //   {
  //     "__typename": "Item",
  //     "_id": "627170904a4ee0a90284397d",
  //     "title": "Test2",
  //     "image": [],
  //     "description": "Test2",
  //     "price": 200,
  //     "discountedPrice": 179,
  //     "stock": 20000,
  //     "brand": "test",
  //     "category": "Men"
  // }

  console.log(item);

  const [state, dispatch] = useStoreContext();

  const { _id, title, image, description, price, discountedPrice, stock, brand, category } = item;

  const { cart } = state;

  const [size, setSize] = useState('S');
  const [quantity, setQuantity] = useState(0);

  const updateQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const updateSize = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validateQuantity = [1, 2, 3, 4, 5].includes(quantity);
  //   // const validateSize = ['S', 'M', 'L'].includes(size);

  //   const payload = {
  //     productId: item._id,
  //     productSize: 'S',
  //     productAmount: quantity,
  //     productOriginalPrice: item.price,
  //     productDiscountedPrice: item.discountedPrice,
  //   };

  //   if (validateQuantity) {
  //     dispatch({
  //       type: ADD_SINGLE_TO_CART,
  //       payload,
  //     });

  //     const randomNr = 100 * Math.random();

  //     await idbPromise('cart', 'put', payload);
  //   }
  // };

  return (
    // <Grid container direction="column" style={{ height: '50%' }}>
    //   <Typography variant="subtitle2">{item.brand}</Typography>
    //   <Typography variant="h4">{item.title}</Typography>
    //   {/* <Typography variant="subtitle2">{item.model}</Typography> */}

    //   <Typography variant="div">{item.description}</Typography>
    //   <Typography variant="h7">£{item.price}</Typography>

    //   <Button
    //     onClick={handleSubmit}
    //     variant="contained"
    //     color="primary"
    //     startIcon={<ShoppingBagIcon />}
    //     style={{ marginTop: 'auto' }}>
    //     Add to Bag
    //   </Button>

    //   <FormControl sx={{ m: 1, maxWidth: 200, minWidth: 120 }}>
    //     <InputLabel id="demo-simple-select-label">Select Quantity</InputLabel>
    //     <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Quantity" onChange={updateQuantity}>
    //       <MenuItem value={1}>1</MenuItem>
    //       <MenuItem value={2}>2</MenuItem>
    //       <MenuItem value={3}>3</MenuItem>
    //       <MenuItem value={4}>4</MenuItem>
    //       <MenuItem value={5}>5</MenuItem>
    //     </Select>
    //   </FormControl>
    // </Grid>
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
          {discountedPrice ? `$ ${discountedPrice}` : `$ ${price}`}
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
