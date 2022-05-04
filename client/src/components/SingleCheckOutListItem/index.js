import React from 'react';
import { useStoreContext } from '../../state/store/provider';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

//Query
import { useQuery } from '@apollo/client';
import { GET_SINGLE_ITEM } from '../../utils/queries';

export default function SingleCheckOutListItem({ singleRowData, rowId }) {
  console.log(singleRowData);
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(GET_SINGLE_ITEM, {
    variables: { itemId: singleRowData.productId },
  });

  const item = data?.item || {};

  //   {
  //     "__typename": "Item",
  //     "_id": "626e6ae99b1ba45c44960314",
  //     "title": "Cross-Stitch Leather Biker Trousers",
  //     "image": [
  //         "/images/crosstitch-trousers.jpg",
  //         "/images/denim-dress.jpg",
  //         "/images/yellow-tracksuit.jpg"
  //     ],
  //     "description": "Black faux-leather trousers with criss-cross leather cord stitching.",
  //     "price": 50,
  //     "discountedPrice": 20,
  //     "stock": 25,
  //     "brand": "Missguided",
  //     "category": "Women"
  // }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={singleRowData.code}>
      <TableCell key="productImage" align="center">
        <CardMedia
          component="img"
          width="200"
          height="200"
          image="https://img.sonofatailor.com/next/img/hineck-cotton-tshirt.62cc710.jpg"
          alt="T-shirt space-holder"
        />
      </TableCell>

      <TableCell key={'productDetail'} align="center">
        <Typography>{item.brand}</Typography>
        <Typography>{item.title}</Typography>
        <Typography>{item.description}</Typography>
      </TableCell>
      <TableCell key={'productDetail'} align="center">
        <IconButton color="primary" aria-label="addOne" component="span">
          <AddIcon sx={{ height: 15, width: 15 }} />
        </IconButton>
        <Typography>{singleRowData.quantity}</Typography>
        <IconButton aria-label="addOne" component="span">
          <RemoveIcon sx={{ height: 15, width: 15 }} />
        </IconButton>
        <IconButton aria-label="addOne" component="span">
          <DeleteIcon sx={{ height: 15, width: 15 }} />
        </IconButton>
      </TableCell>
      <TableCell key={'productDetail'} align="center">
        <Typography>{item.price}</Typography>
        <Typography>{item.discountedPrice}</Typography>
      </TableCell>
      {/* {columnData.map((column, columnId) => {
        const value = singleRowData[column.id];
        if (columnId === 0) {
          return (
            <TableCell key={column.id} align={column.align}>
              <CardMedia
                component="img"
                width="200"
                height="200"
                image="https://img.sonofatailor.com/next/img/hineck-cotton-tshirt.62cc710.jpg"
                alt="T-shirt space-holder"
              />
            </TableCell>
          );
        } else {
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format && typeof value === 'number' ? column.format(value) : value}
            </TableCell>
          );
        }
      })} */}
    </TableRow>
  );
}
