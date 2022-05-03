import React from 'react';
import { useState } from 'react';
import { ADD_SINGLE_TO_CART } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

const Info = ({ item }) => {
  // console.log(item);
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
    const validateSize = ['S', 'M', 'L'].includes(size);

    if (validateQuantity) {
      dispatch({
        type: ADD_SINGLE_TO_CART,
        payload: { productId: item._id, productSize: 'S', productAmount: quantity },
      });
    }
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
  };

  return (
    <Grid container direction="column" style={{ height: '50%' }}>
      <Typography variant="subtitle1">{item.title}</Typography>
      {/* <Typography variant="subtitle2">{item.model}</Typography> */}
      <Divider />

      <Box mt={2}>
        <Typography variant="div">{item.description}</Typography>
        <br></br>
        <Typography variant="h7">£{item.price}</Typography>
      </Box>

      <Divider />

      {/* <FormControl sx={{ m: 1, maxWidth: 200, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Choose Size</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Size" onChange={updateSize}>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
        </Select>
      </FormControl> */}

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

      <Button onClick={handleSubmit} size="medium" variant="contained" color="primary" style={{ marginTop: 'auto' }}>
        Add to Cart <ShoppingCartIcon />
      </Button>
    </Grid>
  );
};

export default Info;
