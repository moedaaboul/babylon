// Must-haves
import React, { useState, useEffect } from 'react';
import './index.css'; //ha ... ha ... like I'm really gonna use it. But fine, just in case

// MUI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

//Components
import CheckoutItemArr from '../../components/Checkout-List';
import Payment from '../../components/Payment';
import CheckoutTotal from '../../components/Checkout-Total';

//Seeding Data
const testCart = require('./testCart.json');

//Other functions
// import Auth from '../../utils/auth';
// import { LOGIN_USER } from '../../utils/mutations';
// const messageExamples = require('./messageExamples.json');
const { getWindowDimensions } = require('../../utils/helpers');

export default function CheckOut() {
  return (
    <Box sx={{ margin: 10, flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid sx={{ width: '100%', overflow: 'hidden' }} item xs={12} md={8}>
          {/* insert item table here */}
          <CheckoutItemArr cartArr={testCart} />
        </Grid>

        <Grid item xs={12} md={4}>
          {/* payment here */}
          <Payment />
        </Grid>

        <Grid item xs={6} md={4}>
          <Button sx={{ position: 'relative', right: 0, bottom: 0 }} variant="contained">
            Continue Shopping
          </Button>
        </Grid>

        <Grid item xs={6} md={4}>
          <CheckoutTotal />
        </Grid>
      </Grid>
      s
    </Box>
  );
}
