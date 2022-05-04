import * as React from 'react';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../state/store/provider';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../state/store/actions';
// import Button from '@mui/material/Button';
// import SaveIcon from '@mui/icons-material/Save';
import CheckoutButton from '../../components/CheckoutButton';
import Container from '@mui/material/Container';
// import SideCart from "../../components/SideCart";
// import './index.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

import DailyInteger from './DailyInteger';
import DailySummary from './DailySummary';
import CheckoutItem from '../../components/SingleCheckoutItem';
import SingleCartItem from '../../components/SingleCartItem';
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

export default function Checkout() {
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
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

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
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  const cartContent = state.cart;

  return (
    <Container maxWidth="xl">
      <Box pt={{ xs: 2, sm: 4, md: 6 }}>
        <StyledTypography variant={'h1'} gutterBottom>
          Shopping Cart.
        </StyledTypography>
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
      </Box>
      <Box pb={3}>
        <DailySummary total={calculateTotal()} />
      </Box>
      <CheckoutButton />
    </Container>
  );
}
