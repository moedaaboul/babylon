import * as React from 'react';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../../state/store/provider';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { ADD_MULTIPLE_TO_CART } from '../../state/store/actions';
import Container from '@mui/material/Container';
import './index.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

import DailySummary from './DailySummary';
import CheckoutItem from '../../components/SingleCheckoutItem';
import { idbPromise } from '../../utils/helpers';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '1.75rem',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.25rem',
  },
}));

export default function Summary() {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      // dispatch({ type: CLEAR_CART });
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: cart });
    }
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      item.discountedPrice
        ? (sum += item.discountedPrice * item.purchaseQuantity)
        : (sum += item.price * item.purchaseQuantity);
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const itemIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        itemIds.push(item._id);
      }
    });
    getCheckout({
      variables: { items: itemIds },
    });
  }

  const cartContent = state.cart;
  return (
    <>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={12} pt={2} pl={2} pr={2} mb={5}>
          <StyledTypography variant={'h1'} gutterBottom>
            Shopping Cart.
          </StyledTypography>
        </Grid>

        <Grid item xs={12} pl={2} pr={2} mb={5}>
          <TableContainer>
            <Table styles={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartContent.map((item, index) => (
                  <CheckoutItem checkoutItem={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container xs={12} pl={2} pr={2} mb={5}>
          <DailySummary total={calculateTotal()} />
        </Grid>

        <Grid container xs={12} pl={2} pr={2} mb={5}>
          <Grid item xs={0} sm={0} md={0} lg={9}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
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
              onClick={submitCheckout}>
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Container maxWidth="xl">
        <Box pt={{ xs: 2, sm: 4, md: 6 }}></Box>
        <Box pb={3}></Box>

        {/* <Button onClick={submitCheckout}>Checkout</Button> */}
      </Container>
    </>
  );
}
