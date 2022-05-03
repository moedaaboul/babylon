import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import MuiTableFooter from '@mui/material/TableFooter';

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

const DailySummary = () => {
  return (
    <TableFooter>
      <Grid container justify={'space-between'} spacing={2}>
        <Grid item xs={12} sm={5} md={4}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Box align={'right'}>
                <b className={{ fontSize: 16 }}>Subtotal:</b>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box px={2} align={'right'} className={{ fontSize: 16 }}>
                <span>$149.96</span>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box align={'right'}>
                <b style={{ fontSize: 16 }}>Shipping:</b>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box px={2} align={'right'} style={{ fontSize: 16 }}>
                <span>$0</span>
              </Box>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Box align={'right'}>
                <b className={{ fontSize: 16 }}>Total:</b>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box px={2} align={'right'} style={{ fontSize: 24 }}>
                <span>$149.96</span>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} md={4} container alignItems={'flex-end'}>
          <Button startIcon={<KeyboardArrowLeft />}>Continue Shopping</Button>
        </Grid>
      </Grid>
    </TableFooter>
  );
};

export default DailySummary;
