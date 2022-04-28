import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from "@mui/material/Button";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import Typography from '@mui/material/Typography';

import CartItem from '../CartItem';

import { ShoppingBag as ShoppingBagIcon } from '@mui/icons-material';

const testSeed = require('./testSeed.json');

// const CartArr = (data) => (
//   <Box
//     sx={{ width: 300 }}
//     role="presentation"
//     onClick={toggleDrawer("right", false)}
//   >
//     <List>
//       <ListItem>
//         <Typography variant="h6" noWrap component="div">
//           Shopping Cart
//         </Typography>
//       </ListItem>
//     </List>
//     <Divider />
//     <List>
//       {data.map((item, index) => (
//         <cartItem item />
//       ))}
//     </List>
//   </Box>
// );

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const List = (data) => (
  //   <Box
  //     sx={{ width: 300 }}
  //     role="presentation"
  //     onClick={toggleDrawer("right", false)}
  //   >
  //     <List>
  //       <ListItem>
  //         <Typography variant="h6" noWrap component="div">
  //           Shopping Cart
  //         </Typography>
  //       </ListItem>
  //     </List>
  //     <Divider />
  //     <List>
  //       {data.map((item, index) => (
  //         <cartItem item />
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <div>
      <React.Fragment key="right">
        <ShoppingBagIcon onClick={toggleDrawer('right', true)} />
        <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
          {/* {list(testSeed)} */}
          <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer('right', false)}>
            <List>
              <ListItem>
                <Typography variant="h6" noWrap component="div">
                  Shopping Cart
                </Typography>
              </ListItem>
            </List>
            <Divider />
            {/* <List> */}
            {testSeed.map((item, index) => (
              <CartItem key={index} data={item} />
            ))}
            {/* </List> */}
          </Box>
          {/* {testSeed.map((item, id) => {})} */}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
