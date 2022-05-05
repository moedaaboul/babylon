import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NoOrderHistory from '../../components/NoOrderHistory';
import OrderHistory from '../../components/OrderHistory';
import { useQuery } from '@apollo/client';
import { GET_HISTORY_ORDERS } from '../../utils/queries';

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '1.75rem',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.25rem',
  },
}));

export default function MyOrders() {
  const { loading, data } = useQuery(GET_HISTORY_ORDERS);

  console.log(data);
  return (
    <div>
      <Container maxWidth="xl">
        <Box pt={{ xs: 2, sm: 4, md: 6 }}>
          <StyledTypography variant={'h1'} gutterBottom>
            Order History
          </StyledTypography>
          <br></br>

          {data ? <OrderHistory data={data.orderHistory} /> : <NoOrderHistory />}
        </Box>
      </Container>
    </div>
  );
}
