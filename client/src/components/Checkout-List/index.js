import React, { useState, useEffect } from 'react';

// MUI component

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//React component
import SingleCheckOutListItem from '../SingleCheckOutListItem';

const columns = require('./columns');
const rows = require('./rows');
const { getWindowDimensions } = require('../../utils/helpers');

export default function CheckoutItemArr({ cartArr }) {
  return (
    <>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cartArr.map((singleCartItem, singleCartItemId) => {
              return <SingleCheckOutListItem singleRowData={singleCartItem} rowId={singleCartItemId} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
