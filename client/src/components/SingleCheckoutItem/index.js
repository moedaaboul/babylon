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

export default function CheckoutItem({ checkoutItem }) {
  // console.log('in checkout item ', checkoutItem);

  const [state, dispatch] = useStoreContext();
  // console.log(state.cart);

  const removeFromCart = (checkoutItem) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: checkoutItem._id,
    });
    idbPromise('cart', 'delete', { ...checkoutItem });
  };

  const addOne = (e) => {
    let value = checkoutItem.purchaseQuantity + 1;
    value > checkoutItem.stock ? (value = checkoutItem.stock) : (value = value);

    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: checkoutItem._id,
      purchaseQuantity: parseInt(value),
    });
    idbPromise('cart', 'put', { ...checkoutItem, purchaseQuantity: parseInt(value) });
  };

  const minusOne = (e) => {
    const value = checkoutItem.purchaseQuantity - 1;
    if (value === 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: checkoutItem._id,
      });
      idbPromise('cart', 'delete', { ...checkoutItem });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: checkoutItem._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise('cart', 'put', { ...checkoutItem, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <TableRow key={checkoutItem._id}>
      <TableCell component="th" scope="row">
        <Box display={'flex'} aligncheckoutItems={'center'}>
          <Box width={80} height={80}>
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              alt={checkoutItem.title}
              src={checkoutItem.image[0]}
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
              {checkoutItem.brand}
            </p>
            <p>{checkoutItem.title}</p>
          </Box>
        </Box>
      </TableCell>
      <TableCell>£ {checkoutItem.discountedPrice}</TableCell>
      <TableCell>
        <Root>
          <CustIconButton onClick={() => minusOne()}>
            <Remove />
          </CustIconButton>
          <ValueElement>{checkoutItem.purchaseQuantity}</ValueElement>
          <CustIconButton onClick={() => addOne()}>
            <Add />
          </CustIconButton>
        </Root>
      </TableCell>
      <TableCell>£ {checkoutItem.discountedPrice * checkoutItem.purchaseQuantity}</TableCell>
      <TableCell>
        <IconButton onClick={() => removeFromCart(checkoutItem)}>
          <Close />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
