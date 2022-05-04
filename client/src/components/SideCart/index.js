import * as React from 'react';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../state/store/actions';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { ShoppingBag as ShoppingBagIcon } from '@mui/icons-material';
import CartItem from '../SingleCartItem';
import EmptyCart from '../EmptyCart';
import ActiveCart from '../ActiveCart';

import { useStoreContext } from '../../state/store/provider';
import { getSummary, idbPromise } from '../../utils/helpers';

// const testSeed = require('./testSeed.json');

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function TemporaryDrawer() {
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
      if (item.discountedPrice) {
        sum += item.discountedPrice * item.purchaseQuantity;
      } else {
        sum += item.price * item.purchaseQuantity;
      }
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

  const cartOpen = state.cartOpen;
  const cartContent = state.cart;

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <div>
      <React.Fragment key="right">
        <ShoppingBagIcon onClick={toggleDrawer('right', true)} />
        <Drawer anchor="right" open={drawerState['right']} onClose={toggleDrawer('right', false)}>
          <Box sx={{ width: 500 }} role="presentation">
            <List>
              <ListItem>
                <Typography variant="h6" noWrap component="div">
                  Shopping Cart
                </Typography>
              </ListItem>
            </List>
            <Divider />
            {cartOpen ? <ActiveCart cart={cartContent} total={calculateTotal()} /> : <EmptyCart />}
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
