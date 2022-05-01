import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { ShoppingBag as ShoppingBagIcon } from '@mui/icons-material';

import CartItem from '../SingleCartItem';

import { useStoreContext } from '../../state/store/provider';
import { getSummary } from '../../utils/helpers';

const testSeed = require('./testSeed.json');

export default function TemporaryDrawer() {
  const [state, dispatch] = useStoreContext();

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
          {/* {list(testSeed)} */}
          {/* <Box sx={{ width: 1000 }} role="presentation" onClick={toggleDrawer('right', false)}> */}
          <Box sx={{ width: 1000 }} role="presentation">
            <List>
              <ListItem>
                <Typography variant="h6" noWrap component="div">
                  Shopping Cart
                </Typography>
              </ListItem>
            </List>
            {cartOpen ? <div>there's some stuff</div> : <div>there's nothing</div>}
            <Divider />
            {/* <List> */}
            {cartContent.map((item, index) => (
              <CartItem key={index} idInCart={index} />
            ))}
            {/* </List> */}
            <Typography>total: {state.summary} </Typography>
            <Typography>saving: {state.saving} </Typography>
          </Box>
          {/* {testSeed.map((item, id) => {})} */}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
