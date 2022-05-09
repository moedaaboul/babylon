import * as React from 'react';
import { useEffect } from 'react';

import { ADD_MULTIPLE_TO_CART } from '../../state/store/actions';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EmptyCart from '../EmptyCart';
import ActiveCart from '../ActiveCart';
import { useDrawerContext } from '../../providers/DrawerStateProvider';

import { useStoreContext } from '../../state/store/provider';
import { idbPromise } from '../../utils/helpers';

// const testSeed = require('./testSeed.json');

export default function TemporaryDrawer() {
  const { drawerState, toggleDrawer } = useDrawerContext();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: cart });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

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

  const cartContent = state.cart;

  return (
    <div>
      <React.Fragment key="right">
        <ShoppingBagIcon onClick={toggleDrawer('right', true)} />
        <Drawer anchor="right" open={drawerState['right']} onClose={toggleDrawer('right', false)}>
          <Box sx={{ width: 400 }} role="presentation">
            <List>
              <ListItem>
                <Typography variant="h6" noWrap component="div">
                  Shopping Cart
                </Typography>
              </ListItem>
            </List>
            <Divider />
            {cartContent.length ? <ActiveCart cart={cartContent} total={calculateTotal()} /> : <EmptyCart />}
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
