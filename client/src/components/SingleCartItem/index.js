import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Close from '@mui/icons-material/Close';
import MuiIconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

import './cart.css';

import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../state/store/provider';

import { UPDATE_CART_QUANTITY, REMOVE_FROM_CART } from '../../state/store/actions';

const Root = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: 4,
  borderRadius: 40,
  border: '1px solid',
  borderColor: theme.palette.grey[300],
}));
const CustIconButton = styled(MuiIconButton)(({ theme }) => ({
  padding: 8,
  '& svg': {
    fontSize: 16,
  },
}));
const ValueElement = styled('span')(({ theme }) => ({
  padding: '0px 8px',
}));

export default function CartItem({ item }) {
  console.log('in cart item', item);

  const [state, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const addOne = (e) => {
    const value = item.purchaseQuantity + 1;

    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: parseInt(value),
    });
    idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
  };

  const minusOne = (e) => {
    const value = item.purchaseQuantity - 1;
    if (value === 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <TableRow
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        maxWidth: 300,
        borderRadius: 1,
      }}
      key={item._id}>
      <TableCell component="th" scope="row" style={{ border: '0px solid rgba(0,0,0,0.2)' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Box width={80} height={80}>
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              alt={item.title}
              src={item.image[0]}
            />
          </Box>
          <Box ml={2}>
            <p
              className={{
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
                fontWeight: 'bold',
                fontSize: 16,
                margin: '0 0 8px 0',
              }}>
              {item.brand}
            </p>
            <p>{item.title}</p>
            <p>£ {item.discountedPrice} / piece</p>
          </Box>
        </Box>
      </TableCell>
      <TableCell style={{ border: '0px solid rgba(0,0,0,0.2)' }}>
        £ {item.discountedPrice * item.purchaseQuantity}
      </TableCell>
      <TableCell style={{ border: '0px solid rgba(0,0,0,0.2)' }}>
        <Root>
          <CustIconButton onClick={() => minusOne()}>
            <Remove />
          </CustIconButton>
          <ValueElement>{item.purchaseQuantity}</ValueElement>
          <CustIconButton onClick={() => addOne()}>
            <Add />
          </CustIconButton>
        </Root>
      </TableCell>
      <TableCell style={{ border: '0px solid rgba(0,0,0,0.2)' }}>
        <IconButton onClick={() => removeFromCart(item)}>
          <Close />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
