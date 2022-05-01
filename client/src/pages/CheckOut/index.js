// Must-haves
import React, { useState, useEffect } from 'react';
import './index.css'; //ha ... ha ... like I'm really gonna use it. But fine, just in case

// Special components
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

//List
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

//Table, it's just too special
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Button
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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

  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box sx={{ margin: 10, flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid sx={{ width: '100%', overflow: 'hidden' }} item xs={12} md={8}>
          {/* insert table here */}
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
          <Card sx={{ height: '100%', minWidth: 200 }}>
            <CardContent>
              <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                Payment Info
              </Typography>

              <Divider />
              <br></br>
              <Typography align="left" variant="caption" component="div" color="text.secondary">
                Choose your payment method
              </Typography>

              <Typography sx={{ margin: 2 }} variant="h5" component="div">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                  <ToggleButton sx={{ width: 100 }} value="creditCard" aria-label="left aligned">
                    <CreditCardIcon />
                  </ToggleButton>
                  <ToggleButton sx={{ width: 100 }} value="paypal" aria-label="centered">
                    Paypal
                  </ToggleButton>
                </ToggleButtonGroup>
              </Typography>
            </CardContent>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />

              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />

              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        Sandra Adams
                      </Typography>
                      {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>

            <CardActions align="left" sx={{ position: 'relative', left: 0, bottom: 0, margin: 2 }}>
              <Button variant="contained">Confirm and Pay</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6} md={4}>
          <Button sx={{ position: 'relative', right: 0, bottom: 0 }} variant="contained">
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
