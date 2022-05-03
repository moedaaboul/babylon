import React from 'react';
import { useState } from 'react';
import { ADD_SINGLE_TO_CART } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Box, Divider, Grid, Typography, Button } from '@mui/material';
import { idbPromise } from '../../utils/helpers';

const Info = ({ item }) => {
  //   {
  //     "__typename": "Item",
  //     "_id": "626e6ae99b1ba45c44960315",
  //     "title": "Oversized Denim Dress",
  //     "image": [
  //         "/images/denim-dress.jpg"
  //     ],
  //     "description": "Stonewashed denim oversized jacket with fabric buttons.",
  //     "price": 30,
  //     "discountedPrice": 20,
  //     "stock": 15,
  //     "brand": "Missguided",
  //     "category": "Women"
  // }

  const [state, dispatch] = useStoreContext();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateQuantity = [1, 2, 3, 4, 5].includes(quantity);
    // const validateSize = ['S', 'M', 'L'].includes(size);

    const payload = {
      productId: item._id,
      productSize: 'S',
      productAmount: quantity,
      productOriginalPrice: item.price,
      productDiscountedPrice: item.discountedPrice,
    };

    if (validateQuantity) {
      dispatch({
        type: ADD_SINGLE_TO_CART,
        payload,
      });

      // idbPromise('cart', 'put', {
      // ...itemInCart,
      // purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      // });
    }
  };

  return (
    <Grid container direction="column" style={{ height: '50%' }}>
      <Typography variant="subtitle1">{item.title}</Typography>
      {/* <Typography variant="subtitle2">{item.model}</Typography> */}
      <Divider />

      <Box mt={2}>
        <Typography variant="div">{item.description}</Typography>
        <Typography variant="h7">£{item.price}</Typography>
      </Box>

      <Divider />

      <FormControl sx={{ m: 1, maxWidth: 200, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Select Quantity</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Quantity" onChange={updateQuantity}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: 'auto' }}>
        Purchase
      </Button>
    </Grid>
  );
};

export default Info;
