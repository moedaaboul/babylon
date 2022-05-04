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
import DailySummary from '../../pages/Checkout/DailySummary';

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
    <TableRow key={item._id}>
      <TableCell component="th" scope="row">
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
            <p>$ {item.discountedPrice} / piece</p>
          </Box>
        </Box>
      </TableCell>
      <TableCell>$ {item.discountedPrice * item.purchaseQuantity}</TableCell>
      <TableCell>
        <Root>
          <CustIconButton>
            <Remove onClick={() => minusOne()} />
          </CustIconButton>
          <ValueElement>{item.purchaseQuantity}</ValueElement>
          <CustIconButton>
            <Add onClick={() => addOne()} />
          </CustIconButton>
        </Root>
      </TableCell>
      <TableCell>
        <IconButton>
          <Close onClick={() => removeFromCart(item)} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
// <div className="flex-row">
//   <div>
//     <img src={`/images/${item.image}`} alt="" />
//   </div>
//   <div>
//     <div>
//       {item.name}, ${item.price}
//     </div>
//     <div>
//       <span>Qty:</span>
//       <input type="number" placeholder="1" value={item.purchaseQuantity} onChange={onChange} />
//       <span role="img" aria-label="trash" onClick={() => removeFromCart(item)}>
//         🗑️
//       </span>
//     </div>
//   </div>
// </div>

// <Card sx={{ display: 'flex' }}>
//   <CardMedia
//     className="image"
//     component="img"
//     sx={{ width: 150, height: 150 }}
//     image={
//       'https://www.coindesk.com/resizer/QbDjo7Itdo_s_mY0nezYcLsCsak=/1200x600/center/top/cloudfront-us-east-1.images.arcpublishing.com/coindesk/UVSE46JF7NAQDFCOPZBCODGPHE.jpg'
//     }
//     alt="Live from space album cover"
//   />

//   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//     <CardContent sx={{ flex: '1 0 auto' }}>
//       <Typography component="div" variant="h6">
//         {state.cart[idInCart].productId}
//       </Typography>
//     </CardContent>

//     <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//       <IconButton color="primary" aria-label="addOne" component="span" onClick={handleAdd}>
//         <AddIcon sx={{ height: 20, width: 20 }} />
//       </IconButton>

//       <Typography variant="div" component="div">
//         {state.cart[idInCart].productAmount}
//       </Typography>

//       <IconButton color="primary" aria-label="minusOne" component="span" onClick={handleMinus}>
//         <RemoveIcon sx={{ height: 20, width: 20 }} />
//       </IconButton>

//       <IconButton color="primary" aria-label="remove" component="span" onClick={handleRemove}>
//         <RemoveCircleOutlineIcon sx={{ height: 20, width: 20 }} />
//       </IconButton>
//     </Box>
//   </Box>
// </Card>

// const handleAdd = (e) => {
//   e.preventDefault();
//   const thisItemQuantity = state.cart[idInCart].productAmount;
//   const addOne = thisItemQuantity + 1;
//   dispatch({
//     type: UPDATE_CART_QUANTITY,
//     payload: {
//       productId: state.cart[idInCart].productId,
//       productSize: state.cart[idInCart].productSize,
//       productAmount: addOne,
//     },
//   });
// };
// const handleMinus = (e) => {
//   e.preventDefault();
//   const thisItemQuantity = state.cart[idInCart].productAmount;
//   const minusOne = thisItemQuantity - 1;
//   if (minusOne !== 0) {
//     dispatch({
//       type: UPDATE_CART_QUANTITY,
//       payload: {
//         productId: state.cart[idInCart].productId,
//         productSize: state.cart[idInCart].productSize,
//         productAmount: minusOne,
//       },
//     });
//   } else {
//     dispatch({
//       type: REMOVE_FROM_CART,
//       payload: {
//         productId: state.cart[idInCart].productId,
//         productSize: state.cart[idInCart].productSize,
//       },
//     });
//   }
// };
// const handleRemove = (e) => {
//   e.preventDefault();
//   dispatch({
//     type: REMOVE_FROM_CART,
//     payload: {
//       productId: state.cart[idInCart].productId,
//       productSize: state.cart[idInCart].productSize,
//     },
//   });
// };

// function createData(image, name, descr, size, quantity, totalPrice) {
//   return { image, name, descr, size, quantity, totalPrice };
// }

// const rows = [
//   createData(
//     'https://dynamic.zacdn.com/TIqU0jk90hPxnuO44NnNXO4B1AU=/fit-in/346x500/filters:quality(95):fill(ffffff)/http://static.sg.zalora.net/p/fila-4662-609589-1.jpg',
//     'Henry T-Shirt',
//     'White, Screen',
//     'S',
//     2,
//     '$39.98'
//   ),
//   createData(
//     'https://www.hybridoutfitters.com/wp-content/uploads/2019/11/147.jpg',
//     'Stripe Tee',
//     'ocean, stripe',
//     'M',
//     3,
//     '$100'
//   ),
//   createData(
//     'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2019/09/18/goods-first-img/1568766431491927776.jpg',
//     'Sweater Hood',
//     'Light Brown, Wool',
//     'S',
//     1,
//     '$39.99'
//   ),
//   createData(
//     'https://l.lnwfile.com/_resize_images/600/600/w1/nh/5z.jpg',
//     'Jackboot',
//     'Brown, Leather',
//     10.5,
//     1,
//     '$69.99'
//   ),
// ];
