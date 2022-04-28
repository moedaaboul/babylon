import React from 'react';
import { ADD_TO_CART } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';

import { Box, Divider, Grid, Typography, Button } from '@mui/material';

const testData = { id: 56789, quantity: 11 };

const Info = ({ title, description, price, color }) => {
  const [state, dispatch] = useStoreContext();

  const handleAddToCart = () => {
    dispatch({ type: ADD_TO_CART, product: 'aProduct' });
  };

  return (
    <Grid container direction="column" style={{ height: '50%' }}>
      <Typography variant="subtitle1">{title}</Typography>

      <Divider />

      <Box mt={2}>
        <Typography variant="h4">{description}</Typography>
        <Typography variant="h5">£{price}</Typography>
        <Typography variant="h6">{color}</Typography>
      </Box>

      <Button onClick={() => handleAddToCart()} variant="contained" color="primary" style={{ marginTop: 'auto' }}>
        Purchase
      </Button>
    </Grid>
  );
};

export default Info;
