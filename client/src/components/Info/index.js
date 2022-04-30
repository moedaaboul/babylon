import React from 'react';
import { useState } from 'react';
import { ADD_SINGLE_TO_CART } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { Box, Divider, Grid, Typography, Button } from '@mui/material';

// const Info = ({ title, description, price, color }) => {
//   const [state, dispatch] = useStoreContext();

//   const handleAddToCart = () => {
//     dispatch({ type: ADD_TO_CART, product: 'aProduct' });
//   };

//   return (
//     <Grid container direction="column" style={{ height: '50%' }}>
//       <Typography variant="subtitle1">{title}</Typography>

//       <Divider />

//       <Box mt={2}>
//         <Typography variant="h4">{description}</Typography>
//         <Typography variant="h5">£{price}</Typography>
//         <Typography variant="h6">{color}</Typography>
//       </Box>

//       <Button onClick={() => handleAddToCart()} variant="contained" color="primary" style={{ marginTop: 'auto' }}>
//         Purchase
//       </Button>
//     </Grid>
//   );
// };

const Info = ({ productData }) => {
  // console.log(productData);
  const [state, dispatch] = useStoreContext();

  const [size, setSize] = useState('');
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
    // console.log(size, quantity);
    const validateQuantity = [1, 2, 3, 4, 5].includes(quantity);
    const validateSize = ['S', 'M', 'L'].includes(size);

    if (validateQuantity && validateSize) {
      dispatch({
        type: ADD_SINGLE_TO_CART,
        payload: { productId: productData._id, productSize: size, productAmount: quantity },
      });
    }
  };

  return (
    <Grid container direction="column" style={{ height: '50%' }}>
      <Typography variant="subtitle1">{productData.name}</Typography>
      <Typography variant="subtitle2">{productData.model}</Typography>
      <Divider />

      <Box mt={2}>
        <Typography variant="div">{productData.description}</Typography>
        <br></br>
        <Typography variant="h7">£{productData.price}</Typography>
      </Box>

      <Divider />

      <FormControl sx={{ m: 1, maxWidth: 200, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Choose Size</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Size" onChange={updateSize}>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
        </Select>
      </FormControl>

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
