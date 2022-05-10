import React from 'react';
import { styled } from '@mui/material/styles';

import MuiButton from '@mui/material/Button';
import MuiGrid from '@mui/material/Grid';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link as RouterLink } from 'react-router-dom';

import './index.css';

export const Grid = styled(MuiGrid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row-reverse',
  },
}));

export const TableFooter = styled('div')(({ theme }) => ({
  border: 'unset',
  position: 'relative',
  backgroundColor: '#fff',
  '&:before': {
    content: '" "',
    position: 'absolute',
    width: '100%',
    height: 24,
    top: 0,
    left: 0,
    transform: 'translateY(-100%)',
    background: 'linear-gradient(to top, #ffffff, rgba(255,255,255,0))',
  },
  [theme.breakpoints.only('sm')]: {
    paddingRight: 64,
  },
  [theme.breakpoints.up('md')]: {
    paddingBottom: 40,
  },
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  width: '100%',
  paddingTop: 16,
  paddingBottom: 16,
  borderRadius: 40,
  border: '1px solid',
  borderColor: theme.palette.grey[400],
  '& > *': {
    fontWeight: 'bold',
    textTransform: 'none',
  },
  marginRight: 72,
  [theme.breakpoints.up('sm')]: {
    marginRight: 'unset',
  },
}));

const DailySummary = ({ total }) => {
  const shippingCost = 0;
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={4} mt={5} alignItems="flex-start">
        <Button
          startIcon={<KeyboardArrowLeft />}
          component={RouterLink}
          to="/items"
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderRadius: 0,
            fontWeight: 'bold',
            letterSpacing: '2px',
            '&:hover': {
              backgroundColor: '#66676e',
              color: '#fff',
            },
            lineHeight: 2.75,
          }}>
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={0} sm={0} md={0} lg={5} display={{ md: 'none', lg: 'flex' }}></Grid>

      <Grid item xs={12} sm={12} md={12} lg={3} mt={5}>
        <TableContainer className="total-table" component={Paper} sx={{ boxShadow: 0 }}>
          <Table sx={{ minWidth: 0 }} size="small" aria-label="a dense table">
            <TableBody>
              <TableRow>
                <TableCell>Subtotal: </TableCell>
                <TableCell align="right">£ {total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipping: </TableCell>
                <TableCell align="right">£ {shippingCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total: </TableCell>
                <TableCell align="right">£ {total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default DailySummary;
