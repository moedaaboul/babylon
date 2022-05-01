// Must-haves
import React, { useState, useEffect } from 'react';
import './index.css'; //ha ... ha ... like I'm really gonna use it. But fine, just in case

// Special components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

//Table, it's just too special
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

//Database
import { useMutation } from '@apollo/client';

//Other functions
// import Auth from '../../utils/auth';
// import { LOGIN_USER } from '../../utils/mutations';
// const messageExamples = require('./messageExamples.json');
const { getWindowDimensions } = require('../../utils/helpers');

// Data input
const columns = require('./columns');
const rows = require('./rows');

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CheckOut() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box sx={{ margin: 10, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid sx={{ width: '100%', overflow: 'hidden' }} item xs={12} md={8}>
          {/* insert table here */}
          <TableContainer sx={{ maxHeight: 440 }}>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column, columnId) => {
                        const value = row[column.id];
                        if (columnId === 0) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <CardMedia
                                component="img"
                                height="194"
                                image="https://toptshirt.co.uk/wp-content/uploads/2016/06/m3.jpg"
                                alt="Paella dish"
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
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          {/* payment here */}
        </Grid>

        <Grid item xs={6} md={4}>
          <Button variant="outlined" sx={{ position: 'relative', left: 0, bottom: 0 }}>
            Continue Shopping
          </Button>
        </Grid>

        <Grid item xs={6} md={4}>
          <TableContainer>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Typography align="left" variant="subtitle2" component="div">
                      Subtotal
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Typography align="right" variant="subtitle1" component="div">
                      64513.23
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Typography align="left" variant="caption" display="block" gutterBottom>
                      You have saved
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Typography align="right" variant="caption" display="block" gutterBottom>
                      99.99
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* <Grid sx={{ height: getWindowDimensions().height * 0.5 }} item xs={12} md={8}>
        <Item>xs=4</Item>
      </Grid> */}
    </Box>
  );
}
