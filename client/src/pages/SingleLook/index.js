import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_LOOK } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { LookItemCard } from '../../sections/looks';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar';

const LookImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
});

const SingleLook = () => {
  const { lookId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_LOOK, { variables: { lookId: lookId } });

  const look = data?.look || {};

  const sumTotal = () => {
    let sum = 0;
    for (let i = 0; i < look.items.length; i++) {
      if (look.items[i].discountedPrice) {
        sum = sum + look.items[i].discountedPrice;
      } else {
        sum = sum + look.items[i].price;
      }
    }

    return sum;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) return `Error! ${error.message}`;

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ my: 5 }}>
                {look.influencer}'s Look
              </Typography>
            </Box>
            <Box sx={{ pt: '100%', position: 'relative' }}>
              <LookImgStyle alt={look.description} src={look.image} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ pt: 20 }}>
              <Box sx={{ textAlign: 'center', fontStyle: 'oblique' }}>
                <Typography variant="h6">
                  "{look.description}" - {look.influencer}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ my: 5 }}>
                GET THIS LOOK FOR £{sumTotal()}
              </Typography>
              <Divider />
              <Stack spacing={2}>
                {look.items.map((item) => (loading ? <h6>is loading...</h6> : <LookItemCard items={item} />))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SingleLook;
